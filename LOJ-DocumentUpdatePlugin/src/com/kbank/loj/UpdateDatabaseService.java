package com.kbank.loj;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONObject;

public class UpdateDatabaseService extends PluginService {

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "updateDBService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		FileNetUtil util = new FileNetUtil();
		DocStatusDBUtil docdbutil = new DocStatusDBUtil();
		JSONResponse js = new JSONResponse();

		try {

			String updateType = request.getParameter("type");
			String larNumber = request.getParameter("LAR");

			String docStatus = "";

			ObjectStore ostore = callbacks.getP8ObjectStore("icmcmtos");
			javax.security.auth.Subject sub = callbacks.getP8Subject("icmcmtos");
			UserContext.get().pushSubject(sub);

			if (updateType.equalsIgnoreCase("both")) {
				String folderId = request.getParameter("folderId");
				String caseStatus = request.getParameter("reason");
				System.out.println(
						folderId + "inside docupdate plugin" + updateType + ":" + larNumber + ":" + caseStatus);

				docStatus = util.getDocumentPropertyValues(folderId, ostore);
				docdbutil.updateCaseStatus(caseStatus, docStatus, larNumber);

			} else if (updateType.equalsIgnoreCase("caseStatus")) {
				String caseCurrentStatus = request.getParameter("caseCurrentStatus");
				docdbutil.updateCaseCurrentStatus(caseCurrentStatus, larNumber);
			} else if (updateType.equalsIgnoreCase("AssignerreturnDate")) {
				String assignerDate = request.getParameter("AssignerDate");
				String dateType = request.getParameter("dateType");

				docdbutil.updatecReturentdTime(dateType, assignerDate, larNumber);

			} else if (updateType.equalsIgnoreCase("checkerSubmitedTime")) {
				String submittedTime = request.getParameter("submittedTime");

				docdbutil.updatecheckerSubmitedTime(submittedTime, larNumber);

			}
			System.out.println("inside docupdate plugin" + docStatus);

			JSONObject robject = new JSONObject();

			robject.put("STATUS", "SUCESS");
			js.put("RESPONSE", robject);
			PluginResponseUtil.writeJSONResponse(request, response, js, callbacks, "UpdateDatabaseService");
		} catch (Exception e) {

			js.put("message", "Fail");
			js.put("errorMessage", e.getMessage());
			PluginResponseUtil.writeJSONResponse(request, response, js, callbacks, "DocCheckListService");
		} finally {
			UserContext.get().popSubject();

		}
	}

}
