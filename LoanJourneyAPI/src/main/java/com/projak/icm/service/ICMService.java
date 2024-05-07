package com.projak.icm.service;

import org.json.JSONArray;

public interface ICMService {

	String getCreateCase();

	String generateRefrenceNumber(String larNo, String customerId);

	JSONArray generateDocumentUrl(String larNo) throws Exception;

	JSONArray updateCaseStatus(String status, String refreneceNo) throws Exception;

	JSONArray generateDocList(String docDate, String osName);
	
}
