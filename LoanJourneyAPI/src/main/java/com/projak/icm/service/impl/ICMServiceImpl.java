package com.projak.icm.service.impl;

import java.util.Iterator;
import java.util.Locale;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.time.format.DateTimeFormatter;

import javax.security.auth.Subject;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.filenet.api.collection.FolderSet;
import com.filenet.api.collection.RepositoryRowSet;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.*;
import com.filenet.api.query.RepositoryRow;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.casemgmt.api.Case;
import com.ibm.casemgmt.api.context.CaseMgmtContext;
import com.ibm.casemgmt.api.objectref.ObjectStoreReference;
import com.ibm.casemgmt.api.properties.CaseMgmtProperties;
import com.ibm.casemgmt.api.context.P8ConnectionCache;
import com.ibm.casemgmt.api.context.SimpleP8ConnectionCache;
import com.ibm.casemgmt.api.context.SimpleVWSessionCache;
import com.projak.icm.controller.LdapController;
import com.projak.icm.service.ICMService;
import com.projak.icm.utility.PropertyReader;

@Service
public class ICMServiceImpl implements ICMService {

	private static final Logger logger = LoggerFactory.getLogger(ICMServiceImpl.class);

	private boolean userSubjectPushed;
	private Connection conn;
	private CaseMgmtContext origCmctx;
	private UserContext uc;

	static final String caseTypename = PropertyReader.getProperty("caseTypename");
	static final String caseReference = PropertyReader.getProperty("caseReference");
	static final String targetOsname = PropertyReader.getProperty("targetOsname");
	static final String domainName = PropertyReader.getProperty("domainName");
	static final String ceURI = PropertyReader.getProperty("ceURI");
	static final String username = PropertyReader.getProperty("username");
	static final String stanza = PropertyReader.getProperty("stanza");
	static final String serverpassword = PropertyReader.getProperty("serverpassword");
	static final String documentUrl = PropertyReader.getProperty("documentUrl");
	static final String desktop = PropertyReader.getProperty("desktop");
	static final String repositoryId = PropertyReader.getProperty("repositoryId");
	static final String repositoryType = PropertyReader.getProperty("repositoryType");

	@Override
	public String generateRefrenceNumber(String larNo, String custId) {

		logger.info("inside generateRefrenceNumber method");
		String larNumber = larNo;
		String customerId = custId;
		String referenceNo = larNumber + "_" + customerId;
		logger.info("reference number is :" + referenceNo);
		return referenceNo;
	}
	
	public JSONArray generateDocList(String docDate, String osName) {
		logger.info("inside generateDocList method");
		
		Connection conn = getCMConnection();
		logger.info("date to search document list is :" + docDate);
		
		String[] parts = docDate.split("-");
		String endDate = parts[2]+parts[1]+parts[0];
		endDate = endDate + "T183000Z";
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate dateToModify = LocalDate.parse(docDate, formatter);
        LocalDate newDate = dateToModify.minusDays(1);
        String startDate = newDate.format(formatter);
        
        String[] endDateSplit = startDate.split("-");
        startDate = endDateSplit[2]+endDateSplit[1]+endDateSplit[0];
        startDate = startDate + "T183000Z";
		
        JSONArray jarray = new JSONArray();

		try {

			logger.info("inside try block :");
			Domain domain = Factory.Domain.fetchInstance(conn, domainName, null);
			ObjectStore os = Factory.ObjectStore.fetchInstance(domain, osName, null);
			
			String searchString = "SELECT t.[Id], t.[MajorVersionNumber], t.[DateLastModified] FROM Document t WHERE NOT IsClass(t, CodeModule)"
					+ " AND (t.[MaskFlag]='No' OR t.[MaskFlag] is null) AND t.[MaskDate] is null AND t.[IsReserved]=false AND t.[VersionStatus] = 1"
					+ " AND t.[DateLastModified] >= "+ startDate +" AND t.[DateLastModified] <= "+ endDate;

			logger.info("generate Document List searchString is " + searchString);
			SearchSQL sqlObject = new SearchSQL(searchString);
			SearchScope searchScope = new SearchScope(os);
			RepositoryRowSet rowSet = searchScope.fetchRows(sqlObject, null, null, new Boolean(true));
			
			if (!rowSet.isEmpty()) {
				Iterator iter = rowSet.iterator();

				while (iter.hasNext()) {
					
					RepositoryRow row = (RepositoryRow) iter.next();
					Id id = row.getProperties().get("Id").getIdValue();
					//logger.info("ID is :::::" + id.toString());
					Document doc = Factory.Document.fetchInstance(os, id, null);
					
					String folderName = null;
					FolderSet folders = doc.get_FoldersFiledIn();
					Iterator it = folders.iterator();
		            while (it.hasNext()) {
		                Folder folder = (Folder) it.next();
		                //logger.info("Folder Name: " + folder.get_FolderName());
		                folderName = folder.get_FolderName();
		            }
		            
		            Integer versionNumber = row.getProperties().get("MajorVersionNumber").getInteger32Value();
					//logger.info("version number is :::::" + versionNumber.toString());
					
					Date modifiedDate= (Date) doc.getProperties().get("DateLastModified").getObjectValue();
					//logger.info("Last Modified Date is "+modifiedDate.toString());

			        DateTimeFormatter originalFormatter = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss zzz yyyy");
			        LocalDateTime dateTime = LocalDateTime.parse(modifiedDate.toString(), originalFormatter);
			        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
			        String formattedDate = dateTime.format(outputFormatter);
			        //logger.info("Formatted Date is: " + formattedDate);
					
			        JSONObject jObject = new JSONObject();
					if(folderName!=null) {
						jObject.put("DocId", id.toString());
						jObject.put("LastModifiedDate", formattedDate);
						jObject.put("FolderName", folderName);
    					jObject.put("VersionNumber", versionNumber.toString());
    					jObject.put("RepositoryName", osName);
    					
    					jarray.put(jObject);
					}
				}
			}else {
				JSONObject jObject = new JSONObject();
				logger.info("no document found in generateDocumentList");
				jObject.put("Message", "No document found");
				jarray.put(jObject);
			}
			

		} catch (Exception e) {
			throw e;
		} finally {
			releaseCMConnection();
		}

		return jarray;
	}
	
	
	public JSONArray updateCaseStatus(String status, String refreneceNo) throws Exception {
		logger.info("inside updateCaseStatus method of icm service impl");
		Connection conn = getCMConnection();
		logger.info("status is :" + status);
		String response = "";
		Integer code;
		String flag = "";

		JSONArray jarray = new JSONArray();

		try {

			logger.info("inside try block :");
			Domain domain = Factory.Domain.fetchInstance(conn, domainName, null);
			ObjectStore os = Factory.ObjectStore.fetchInstance(domain, targetOsname, null);
			ObjectStoreReference osRef = new ObjectStoreReference(os);

			String searchString = "SELECT t.[This],t.[FolderName],t.[Id] FROM [" + caseTypename + "] t WHERE t.["
					+ caseReference + "] = '" + refreneceNo + "' AND t.[CmAcmCaseState] = 2 ";

			logger.info("update status searchString is " + searchString);
			SearchSQL sqlObject = new SearchSQL(searchString);
			SearchScope searchScope = new SearchScope(os);
			RepositoryRowSet rowSet = searchScope.fetchRows(sqlObject, null, null, new Boolean(true));
			Iterator iter = rowSet.iterator();

			if (iter.hasNext()) {
				flag = "true";
				RepositoryRow row = (RepositoryRow) iter.next();
				String folderName = row.getProperties().get("FolderName").getStringValue();
				String caseInstanceFolderName = folderName;
				logger.info("folder name :::::" + caseInstanceFolderName);
				Id id = row.getProperties().get("Id").getIdValue();
				logger.info("id is :::::::" + id);
				Case caseObj = Case.fetchInstance(osRef, id, null, null);
				logger.info("case obj ::::::::" + caseObj + folderName);
				CaseMgmtProperties caseProps = caseObj.getProperties();

				JSONObject jObject = new JSONObject();

				if (null != status) {

					caseProps.putObjectValue("LJ_LoanStatus", status);

					caseObj.save(RefreshMode.REFRESH, null, null);
					response = "Status Updated Successfully";
					code = 0;
					logger.info("response is :" + response);
					jObject.put("code", code).toString();
					jObject.put("status", response).toString();

				} else {
					response = "Error while updating status";
					logger.info("response is :" + response);
					code = 1;
					jObject.put("code", code).toString();
					jObject.put("status", response).toString();
				}

				jarray.put(jObject.toString());
			}

			if (!flag.equalsIgnoreCase("true")) {
				JSONObject jObject = new JSONObject();
				response = "Error while updating status";
				logger.info("response is :" + response);
				code = 1;
				jObject.put("code", code).toString();
				jObject.put("status", response).toString();
				jarray.put(jObject.toString());
			}

		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			releaseCMConnection();
		}

		return jarray;
	}

	
	public JSONArray generateDocumentUrl(String larNo) {
		Connection conn = getCMConnection();

		logger.info("inside generateDocumentUrl method where lar is :" + larNo);
		String flag = "";
		JSONArray array = new JSONArray();

		try {

			String SQL = "Select [Id],[DocumentTitle] From [LJ_LoanJourneyCasetype] where [LJ_LARNumber] = '" + larNo + "'";
			logger.info("search sql is :" + SQL);
			Domain domain = Factory.Domain.fetchInstance(conn, domainName, null);
			logger.info("domain is :" + domain);
			ObjectStore os = Factory.ObjectStore.fetchInstance(domain, targetOsname, null);
			SearchScope scope = new SearchScope(os);
			SearchSQL sql = new SearchSQL(SQL);
			logger.info("sql is.........." + sql);
			RepositoryRowSet rowSet = scope.fetchRows(sql, null, null, null);

			if (!rowSet.isEmpty()) {

				Iterator iter = rowSet.iterator();

				while (iter.hasNext()) {
					flag = "true";
					RepositoryRow row = (RepositoryRow) iter.next();

					Id ID = row.getProperties().getIdValue("Id");
					logger.info("id is ............" + ID);

					Document doc = Factory.Document.fetchInstance(os, ID, null);
			        String vsId = doc.get_VersionSeries().get_Id().toString();
			        logger.info("vs id is >>>>>>" + vsId);
			        String docTitle = row.getProperties().getStringValue("DocumentTitle");
			        logger.info("document title is ......" + docTitle);
			        JSONObject jobj = new JSONObject();
			        String URL = documentUrl + "desktop=" + desktop + "&repositoryId=" + repositoryId + "&repositoryType=" + repositoryType + "&docid=" + ID.toString() + "";
			        logger.info("url is ......" + URL);
			        logger.info("document name is :" + docTitle);
			        jobj.put(docTitle, URL);
			        array.put(jobj.toString());
					
				}

			} 
			if (!flag.equalsIgnoreCase("true")) {
		        JSONObject jObject = new JSONObject();
		        logger.info("no documents found");
		        jObject.put("", "No document found");
		        array.put(jObject.toString());
		    } 

		} catch (Exception e) {
			throw e;
		} finally {
			releaseCMConnection();
		}

		return array;

	}

	public Connection getCMConnection() {

		P8ConnectionCache connCache = new SimpleP8ConnectionCache();
		logger.info(" inside getCMConnection url is ........" + ceURI);
		conn = connCache.getP8Connection(ceURI);
		Subject subject = UserContext.createSubject(conn, username, serverpassword, stanza);
		uc = UserContext.get();
		uc.pushSubject(subject);
		userSubjectPushed = true;
		Locale origLocale = uc.getLocale();
		uc.setLocale(Locale.ENGLISH);
		origCmctx = CaseMgmtContext.set(new CaseMgmtContext(new SimpleVWSessionCache(), connCache));
		return conn;
	}

	public void releaseCMConnection() {
		if (userSubjectPushed) {
			CaseMgmtContext.set(origCmctx);
			Locale origLocale = uc.getLocale();
			uc.setLocale(origLocale);
			uc.popSubject();
			userSubjectPushed = false;
			conn = null;
			origCmctx = null;
			logger.info("Connection Released");
		}
	}


	public String getCreateCase() {
		// TODO Auto-generated method stub
		return null;
	}

}