package com.ibm.sweep.job;

import java.io.IOException;
import com.filenet.api.sweep.*;
import com.filenet.api.engine.HandlerCallContext;
import com.filenet.api.engine.SweepActionHandler;
import com.filenet.api.engine.SweepItemOutcome;
import com.filenet.api.core.*;
import com.filenet.api.constants.*;
import com.filenet.api.exception.*;
import com.itextpdf.text.pdf.PdfReader;

public class CustomSweepHandler implements SweepActionHandler
{
   // Implement for custom job and queue sweeps.
   public void onSweep(CmSweep sweepObject, SweepActionHandler.SweepItem [] sweepItems)
       throws EngineRuntimeException
   {
         HandlerCallContext hcc = HandlerCallContext.getInstance();
         hcc.traceDetail("Entering CustomSweepHandler.onSweep");
         hcc.traceDetail("sweepObject = " 
              + sweepObject.getProperties().getIdValue(PropertyNames.ID)
              + "  sweepItems.length = " + sweepItems.length);

        // Iterate the sweepItems and change the class.
        for (int i = 0; i < sweepItems.length; i++)
        {
           // At the top of your loop, always check to make sure 
           // that the server is not shutting down. 
           // If it is, clean up and return control to the server.
          
           if (hcc != null && hcc.isShuttingDown())
           { 
              throw new EngineRuntimeException(ExceptionCode.E_BACKGROUND_TASK_TERMINATED, 
                 this.getClass().getSimpleName() 
                 + " is terminating prematurely because the server is shutting down");
           }

           // Extract the target object from the SweepItem array.
           IndependentlyPersistableObject obj = sweepItems[i].getTarget();
           String msg = "sweepItems[" + i + "]= " + obj.getProperties().getIdValue("ID");
           hcc.traceDetail(msg);

           try 
           {
               Document doc = (Document) obj;
               doc.refresh();
               PdfReader reader = new PdfReader(doc.accessContentStream(0));
               int count= reader.getNumberOfPages();
               hcc.traceDetail("Document Page Count : "+count);
               
               // Set HF_Count Property value and save
               doc.getProperties().putValue("HF_PageCount", String.valueOf(count));
               doc.save(RefreshMode.NO_REFRESH);
               
               // Set outcome to PROCESSED if item processed successfully.
               sweepItems[i].setOutcome(SweepItemOutcome.PROCESSED,
                  "item processed by " + this.getClass().getSimpleName());
           }
           // Set failure status on objects that fail to process.
           catch (EngineRuntimeException e)
           {
               sweepItems[i].setOutcome(SweepItemOutcome.FAILED, 
                   "CustomSweepHandler: " + e.getMessage());
           } catch (IOException e) {
        	   sweepItems[i].setOutcome(SweepItemOutcome.FAILED, 
                       "CustomSweepHandler: " + e.getMessage());
		}
       }
       hcc.traceDetail("Exiting CustomSweepHandler.onSweep");
    }

    /* 
     * Called automatically when the handler is invoked by a custom sweep job or sweep policy.
     * Specify properties required by the handler, if any.
     * If you return an empty array, then all properties are fetched.
     */
    public String [] getRequiredProperties()
    {
        String [] names = {PropertyNames.ID};
        return names;
    }
	
    /* Implement for custom sweep policies.
     * This method is not implemented because this is an example of a custom sweep job.
     */
    public void onPolicySweep(CmSweep sweepObject,CmSweepPolicy policyObject, 
        SweepActionHandler.SweepItem [] sweepItems)
    {}
}