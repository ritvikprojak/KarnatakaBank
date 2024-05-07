package com.projak.ktkbank.sweep.action;

import com.filenet.api.sweep.*;
import com.filenet.api.engine.HandlerCallContext;
import com.filenet.api.engine.SweepActionHandler;
import com.filenet.api.engine.SweepItemOutcome;
import com.filenet.api.core.*;

import java.util.ArrayList;
import java.util.List;

import com.filenet.api.constants.*;
import com.filenet.api.exception.*;

public class SweepDisposal implements SweepActionHandler{
	// Implement for custom job and queue sweeps.
	   public void onSweep(CmSweep sweepObject, SweepActionHandler.SweepItem [] sweepItems)
	       throws EngineRuntimeException
	   {
		   System.out.println("Inside Test2 Custom Sweep Job");
		   List<String[]> reportData = new ArrayList<String[]>();
		   ReportGeneration rp = new ReportGeneration();
	       HandlerCallContext hcc = HandlerCallContext.getInstance();
	       System.out.println("Entering CustomSweepHandler.onSweep");
	       System.out.println("sweepObject = " 
	            + sweepObject.getProperties().getIdValue(PropertyNames.ID)
	            + "  sweepItems.length = " + sweepItems.length);
	       hcc.traceDetail("Entering CustomSweepHandler.onSweep");
	       hcc.traceDetail("sweepObject = " 
	            + sweepObject.getProperties().getIdValue(PropertyNames.ID)
	            + "  sweepItems.length = " + sweepItems.length);

	       // Iterate the sweepItems and change the class.
	       for (int i = 0; i < sweepItems.length; i++){
	    	   
	    	   System.out.println("Inside For Loop");
	    	   if (hcc != null && hcc.isShuttingDown()){ 
	              
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
	        	   System.out.println("Inside Try");
	               Document doc = (Document) obj;
	               System.out.println("Its a Document object");
	               //String lastDate = doc.getProperties().getDateTimeValue("DateLastModified").toString();
	               String id = doc.get_Id().toString();
	               System.out.println("Id is "+id.toString());
	               doc.delete();
	               doc.save(RefreshMode.NO_REFRESH);
	               System.out.println("Document delete saved");
	               reportData.add(new String[] {id, "Document Deleted"});
	               System.out.println("Document deleted SweepHandlerSweepDisposal.onSweep");
	               
	               // Set outcome to PROCESSED if item processed successfully.
	               sweepItems[i].setOutcome(SweepItemOutcome.PROCESSED,
	                  "item processed by " + this.getClass().getSimpleName());
	           }
	           // Set failure status on objects that fail to process.
	           catch (EngineRuntimeException e){
	               sweepItems[i].setOutcome(SweepItemOutcome.FAILED, 
	                   "CustomSweepHandler: " + e.getMessage());
	           }catch(Exception e) {
	        	   hcc.traceDetail("Exception in CustomSweepHandler.onSweep");
	        	   System.out.println("Exception in CustomSweepHandler.onSweep");
	        	   e.printStackTrace();
	           }
	       }
	       hcc.traceDetail("Exiting CustomSweepHandler.onSweep");
	       System.out.println("Exiting CustomSweepHandler.onSweep");
	       Boolean report_response = rp.generateReport(reportData, hcc);
           hcc.traceDetail("Value of report is "+report_response.toString());
           System.out.println("Value of report is "+report_response.toString());
	   }

	    /* 
	     * Called automatically when the handler is invoked by a custom sweep job or sweep policy.
	     * Specify properties required by the handler, if any.
	     * If you return an empty array, then all properties are fetched.
	     */
	   public String [] getRequiredProperties(){
	        String [] names = {};
	        return names;
	   }
		
	    /* Implement for custom sweep policies.
	     * This method is not implemented because this is an example of a custom sweep job.
	     */
	   public void onPolicySweep(CmSweep sweepObject,CmSweepPolicy policyObject, 
	        SweepActionHandler.SweepItem [] sweepItems){
		   
	   }
}

