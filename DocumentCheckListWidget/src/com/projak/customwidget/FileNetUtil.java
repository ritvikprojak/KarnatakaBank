package com.projak.customwidget;

import java.util.Iterator;

import com.filenet.api.collection.DocumentSet;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;

public class FileNetUtil {

	public String getCasePropertyValue(String folderId,ObjectStore os)
	{
		String CaseStatus="";
		Folder folder=Factory.Folder.fetchInstance(os, new Id(folderId), null);
		String larNumber=folder.getProperties().getStringValue("LJ_LARNumber");
		String status=folder.getProperties().getStringValue("LJ_ReasonforReturning");
		CaseStatus=larNumber+"~"+status;
		System.out.println("CaseStatus"+CaseStatus);
		return CaseStatus;

	}
	public String getDocumentPropertyValues(String folderId,ObjectStore os)
	{
		Folder folder=Factory.Folder.fetchInstance(os, new Id(folderId), null);
		DocumentSet docs=folder.get_ContainedDocuments();
		String allDocStatus="";
		Iterator it=docs.iterator();
		while(it.hasNext()){
			Document doc=(Document)it.next();
			String docCode=doc.getProperties().getStringValue("LJ_ReasonforReturning");
			String docStatus=doc.getProperties().getStringValue("LJ_LVBDstatus");
			System.out.println(docCode+" :status : "+allDocStatus);

			if(docStatus==null)
				docStatus="";
		
			allDocStatus=allDocStatus+docCode+"~"+docStatus;

		}
		System.out.println("allDocumentSatus"+allDocStatus);

		return allDocStatus;

	}
}
