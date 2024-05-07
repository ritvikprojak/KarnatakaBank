package com.projak.customwidget;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class DocumentCheckListMailService extends PluginService {

	public String getId() {
		return "DocCheckListMailService";
	}

	public String getOverriddenService() {
		return null;
	}

	
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println("Inside Delete Functionality Service");

		PluginLogger logger = callbacks.getLogger();

		JSONResponse js = new JSONResponse();
		String mailRepsonese="";
		String subject = request.getParameter("Subject");
		String comments = request.getParameter("comments");
     	String toEmail = request.getParameter("toEmail");
		String lar = request.getParameter("lar");

		response.setContentType("application/json");

           EmailServiceImpl impl=new EmailServiceImpl();

           mailRepsonese = impl.generateAndSendEmail(subject, comments, toEmail, lar);

		
		try {

			logger.logInfo(logger, "DocumentChecklist widget", "DocCheckListMailService");
			js.put("RESPONSE", mailRepsonese);
			PluginResponseUtil.writeJSONResponse(request, response, js, callbacks, "CheckUserRolePermissionService");
		} catch (Exception e) {
			logger.logError(logger, "DocCheckListService", "Exception in DocCheckListService" + e.getLocalizedMessage(),
					e.fillInStackTrace());
			js.put("message", "Fail");
			js.put("errorMessage", e.getMessage());
			PluginResponseUtil.writeJSONResponse(request, response, js, callbacks, "DocCheckListService");
		}

	}

}
