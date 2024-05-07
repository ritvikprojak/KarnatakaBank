package com.projak.customwidget;

import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Hashtable;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.upload.FormFile;

import com.filenet.api.collection.ContentElementList;
import com.filenet.api.collection.IndependentObjectSet;
import com.filenet.api.constants.AutoClassify;
import com.filenet.api.constants.AutoUniqueName;
import com.filenet.api.constants.CheckinType;
import com.filenet.api.constants.DefineSecurityParentage;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.ContentTransfer;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.core.ReferentialContainmentRelationship;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.security.Subject;
import com.ibm.ecm.struts.actions.FileUploadActionForm;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class AddDocumentServicePlugin extends PluginService{

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "CustomWidgetServicePluginId";
	}

	@Override
	public void execute(PluginServiceCallbacks objCallbacks, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		
		System.out.println("inside the Service");
		
		PrintWriter printWriter = response.getWriter();
	    JSONObject jsonObject = new JSONObject();
	    JSONArray jsonArray = new JSONArray();
		try
		{
			
		
		FileUploadActionForm form = (FileUploadActionForm)request.getAttribute(FileUploadActionForm.class.getName());
		Hashtable hashtable = form.getMultipartRequestHandler().getFileElements();
		@SuppressWarnings("deprecation")
		FormFile formFile = (FormFile)hashtable.get("file");
		InputStream inputStream = formFile.getInputStream();
		System.out.println("File_name-----"+inputStream);
		                    //request.getParameter("repositoryType");
		
		String repositoryId = request.getParameter("repositoryId");
	    String caseId = request.getParameter("caseId");
	    String caseType = request.getParameter("caseType");
	    String parm_part_filename = request.getParameter("parm_part_filename");
	    String mimetype = request.getParameter("mimetype");
	    String LARNumber = request.getParameter("LANNumber");
        String customerName = request.getParameter("customerName");
	    String refrenceNumber = request.getParameter("refrenceNumber");
	   // String branchCode = request.getParameter("branchCode");
	    String docCode = request.getParameter("docCode");

	    System.out.println("repositoryId :::::::::::" + repositoryId);
	    System.out.println("caseId :::::::::::" + caseId);
	    System.out.println("caseType :::::::::::" + docCode);
	    
	    
	    

	    ObjectStore obj_ObjectStore = objCallbacks.getP8ObjectStore(repositoryId);
	    javax.security.auth.Subject sub=objCallbacks.getP8Subject(repositoryId);
	    UserContext.get().pushSubject(sub);
	    
	    Document obj_Document = Factory.Document.createInstance(obj_ObjectStore, "LJ_LoanJourneyDocument");

	    obj_Document.getProperties().putValue("DocumentTitle", parm_part_filename);
	    obj_Document.getProperties().putValue("LJ_LARNumber", LARNumber);
	    obj_Document.getProperties().putValue("LJ_CustomerName", customerName);
	    obj_Document.getProperties().putValue("LJ_ReferenceNumber",refrenceNumber);
	    obj_Document.getProperties().putValue("LJ_ReferenceNumber",refrenceNumber);
	    obj_Document.getProperties().putValue("LJ_DocumentCode",docCode);

	    ContentTransfer ctObject = Factory.ContentTransfer.createInstance();
	    ContentElementList contentList = Factory.ContentTransfer.createList();
	    ctObject.setCaptureSource(inputStream);
	    contentList.add(ctObject);
	    ctObject.set_ContentType(mimetype);
	    ctObject.set_RetrievalName(parm_part_filename);
	    obj_Document.set_ContentElements(contentList);

	    obj_Document.checkin(AutoClassify.AUTO_CLASSIFY, CheckinType.MAJOR_VERSION);
	    obj_Document.save(RefreshMode.REFRESH);

	    String query = "SELECT [This] ,ID  FROM [" + caseType + "]  where  Id=";

	    query = query + "'{" + caseId + "}'";

	    System.out.println("query :::::::::: " + query);

	    SearchSQL searchSQL = new SearchSQL();

	    searchSQL.setQueryString(query);

	    SearchScope searchScope = new SearchScope(obj_ObjectStore);

	    System.out.println("searchScope ::::::::::::: " + searchScope);

	    IndependentObjectSet independentObjectSet = searchScope.fetchObjects(searchSQL, null, null, null);

	    System.out.println("independentObjectSet  ::::::::::::: " + independentObjectSet);

	    Iterator iterator = independentObjectSet.iterator();

	    while (iterator.hasNext())
	    {
	      Folder folderImpl = (Folder)iterator.next();

	      ReferentialContainmentRelationship rcrObject = folderImpl.file(obj_Document, AutoUniqueName.AUTO_UNIQUE, null, DefineSecurityParentage.DO_NOT_DEFINE_SECURITY_PARENTAGE);

	      rcrObject.save(RefreshMode.REFRESH);
	      rcrObject.refresh();
	      System.out.println("rcr object ::::" + rcrObject.get_Id());
	    }

	    jsonObject.put("name", "Document Created Successfully");
	    jsonArray.add(jsonObject);
	    printWriter.print(jsonArray);
	    printWriter.close();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			UserContext.get().popSubject();
		}
	    
	}

}
