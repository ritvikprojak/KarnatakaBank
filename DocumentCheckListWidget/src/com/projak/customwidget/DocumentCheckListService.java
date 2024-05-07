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

public class DocumentCheckListService extends PluginService {

	public String getId() {
		return "DocCheckListService";
	}

	public String getOverriddenService() {
		return null;
	}

	/**
	 * Performs the action of this service.
	 * 
	 * @param callbacks
	 *            An instance of the <code>PluginServiceCallbacks</code> class
	 *            that contains several functions that can be used by the
	 *            service. These functions provide access to the plug-in
	 *            configuration and content server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> object that provides the
	 *            request. The service can access the invocation parameters from
	 *            the request.
	 * @param response
	 *            The <code>HttpServletResponse</code> object that is generated
	 *            by the service. The service can get the output stream and
	 *            write the response. The response must be in JSON format.
	 * @throws Exception
	 *             For exceptions that occur when the service is running. If the
	 *             logging level is high enough to log errors, information about
	 *             the exception is logged by IBM Content Navigator.
	 */
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println("Inside Delete Functionality Service");

		PluginLogger logger = callbacks.getLogger();

		JSONResponse js = new JSONResponse();
		JSONArray checkListArray = new JSONArray();
		String productId = request.getParameter("ProductID");
		DBUtil db = new DBUtil();
		response.setContentType("application/json");
		PluginLogger abc=callbacks.getLogger();

		checkListArray = db.getDocCheckList(productId);
		System.out.println("checkListArray" + checkListArray);
		System.out.println("DBARRAY SIZE" + checkListArray.size());

		if (checkListArray.size() <= 0) {
			System.out.println("no records found");
		}
		try {

			logger.logInfo(logger, "HomeLoanDeleteService", "Check UserRolePermission Service");
			js.put("RESPONSE", checkListArray);
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
