package com.ibm.sweep.job;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.filenet.api.sweep.*;
import com.filenet.api.engine.HandlerCallContext;
import com.filenet.api.engine.SweepActionHandler;
import com.filenet.api.engine.SweepItemOutcome;
import com.filenet.api.core.*;
import com.filenet.api.constants.*;
import com.filenet.api.exception.*;
import com.itextpdf.text.pdf.PdfReader;

import filenet.vw.api.VWLog;
import filenet.vw.api.VWLogElement;
import filenet.vw.api.VWLogQuery;
import filenet.vw.api.VWSession;

public class BatchJobSweepHandler implements SweepActionHandler {
	// Implement for custom job and queue sweeps.
	public void onSweep(CmSweep sweepObject,
			SweepActionHandler.SweepItem[] sweepItems)
			throws EngineRuntimeException {
		HandlerCallContext hcc = HandlerCallContext.getInstance();
		hcc.traceDetail("Entering CustomSweepHandler.onSweep");
		hcc.traceDetail("sweepObject = "
				+ sweepObject.getProperties().getIdValue(PropertyNames.ID)
				+ "  sweepItems.length = " + sweepItems.length);

		// Iterate the sweepItems and change the class.
		for (int i = 0; i < sweepItems.length; i++) {
			// At the top of your loop, always check to make sure
			// that the server is not shutting down.
			// If it is, clean up and return control to the server.

			if (hcc != null && hcc.isShuttingDown()) {
				throw new EngineRuntimeException(
						ExceptionCode.E_BACKGROUND_TASK_TERMINATED,
						this.getClass().getSimpleName()
								+ " is terminating prematurely because the server is shutting down");
			}

			// Extract the target object from the SweepItem array.
			IndependentlyPersistableObject obj = sweepItems[i].getTarget();
			String msg = "sweepItems[" + i + "]= "
					+ obj.getProperties().getIdValue("ID");
			hcc.traceDetail(msg);

			try {
				
				VWSession session = new VWSession("p8admin", "Dms@1234",
						"CP_1");

				System.out.println("Is Logged On : " + session.isLoggedOn());

				VWLog vwLog = session.fetchEventLog("LJ_LoanJourneyCasetype");

				vwLog.setBufferSize(25);

				Folder _case = (Folder) obj;

				_case.refresh();

				String _id = _case.get_Id().toString();

				String[] translatedId = _id.substring(1, _id.length() - 1)
						.split("-");

				StringBuilder db = new StringBuilder("x'");

				for (int k = 0; k < translatedId.length; k++) {
					String chunk = translatedId[k];
					if (k < 3) {
						System.out.println(chunk);
						char[] charByte = new char[2];
						for (int j = chunk.length() - 1; j >= 0; j--) {
							if (j % 2 == 0) {
								charByte[0] = chunk.charAt(j);
								db.append(charByte);
								charByte = new char[2];
							} else {
								charByte[1] = chunk.charAt(j);
							}
						}
					} else {
						db.append(chunk);
					}
				}

				String filter = "F_CaseFolder = " + db.toString()
						+ "' AND F_EventType = 360";

				System.out.println("Filter - " + filter);

				VWLogQuery logQuery = vwLog.startQuery(null, null, null, 0,
						filter, null);

				VWLogElement element = logQuery.next();

				int count = 0;

				if (element == null) {

					System.out.println("Element is null");

				} else {

					do

					{

						List<String> fieldNames = null;

						// display the fields

						fieldNames = Arrays.asList(element.getFieldNames());

						if (fieldNames.isEmpty())

						{

							System.out.println(" No fields!");

						}

						else {

							String stepName = element.getStepName();

							String response = element.getSelectedResponse();

							Date timeStamp = element.getTimeStamp();

							if (stepName
									.equalsIgnoreCase("Loan Processing Officer")
									&& (response.equalsIgnoreCase("Complete")
											|| response
													.equalsIgnoreCase("Terminated") || response
												.equalsIgnoreCase("Terminated App"))) {

								System.out.println("Time Stamp for " + stepName
										+ " - " + timeStamp);

								System.out.println("Response for " + stepName
										+ " - " + response);

								_case.getProperties().putValue("LJ_TimeStamp",
										timeStamp);

							} else if (stepName
									.equalsIgnoreCase("Branch Maker")
									&& (response.equalsIgnoreCase("Submit")
											|| response
													.equalsIgnoreCase("Terminated") || response
												.equalsIgnoreCase("Terminated App"))) {

								System.out.println("Time Stamp for " + stepName
										+ " - " + timeStamp);

								System.out.println("Response for " + stepName
										+ " - " + response);

								_case.getProperties().putValue(
										"LJ_BranchMakersSubmittedTime",
										timeStamp);

							} else if (stepName
									.equalsIgnoreCase("Branch Checker")
									&& (response.equalsIgnoreCase("Submit")
											|| response
													.equalsIgnoreCase("Terminated") || response
												.equalsIgnoreCase("Terminated App"))) {

								System.out.println("Time Stamp for " + stepName
										+ " - " + timeStamp);

								System.out.println("Response for " + stepName
										+ " - " + response);

								_case.getProperties().putValue(
										"LJ_BranchCheckersSubmittedTime",
										timeStamp);

							} else if (stepName.equalsIgnoreCase("Assigner")
									&& (response.equalsIgnoreCase("Submit")
											|| response
													.equalsIgnoreCase("Terminated") || response
												.equalsIgnoreCase("Terminated App"))) {

								System.out.println("Time Stamp for " + stepName
										+ " - " + timeStamp);

								System.out.println("Response for " + stepName
										+ " - " + response);

								_case.getProperties().putValue(
										"LJ_AssignersSubmittedTime", timeStamp);

							} else {
								
								System.out.println("Somethings Wrong with the case!!!!");

							}

						}

					}

					while ((element = logQuery.next()) != null);

				}
				
				_case.save(RefreshMode.NO_REFRESH);

				// Set outcome to PROCESSED if item processed successfully.
				sweepItems[i].setOutcome(SweepItemOutcome.PROCESSED,
						"item processed by " + this.getClass().getSimpleName());
			}
			// Set failure status on objects that fail to process.
			catch (EngineRuntimeException e) {
				sweepItems[i].setOutcome(SweepItemOutcome.FAILED,
						"CustomSweepHandler: " + e.getMessage());
			}
		}
		hcc.traceDetail("Exiting CustomSweepHandler.onSweep");
	}

	/*
	 * Called automatically when the handler is invoked by a custom sweep job or
	 * sweep policy. Specify properties required by the handler, if any. If you
	 * return an empty array, then all properties are fetched.
	 */
	public String[] getRequiredProperties() {
		String[] names = { PropertyNames.ID };
		return names;
	}

	/*
	 * Implement for custom sweep policies. This method is not implemented
	 * because this is an example of a custom sweep job.
	 */
	public void onPolicySweep(CmSweep sweepObject, CmSweepPolicy policyObject,
			SweepActionHandler.SweepItem[] sweepItems) {
	}
}