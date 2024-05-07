package com.kbank.loj;

import java.util.Iterator;

import com.filenet.api.collection.DocumentSet;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.util.Id;

public class FileNetUtil {

	public String getCasePropertyValue(String folderId, ObjectStore os) {
		String CaseStatus = "";
		Folder folder = Factory.Folder.fetchInstance(os, new Id(folderId), null);
		folder.save(RefreshMode.REFRESH);
		System.out.println("CaseStatus" + folder.get_FolderName());

		String larNumber = folder.getProperties().getStringValue("LJ_LARNumber");
		String status = folder.getProperties().getStringValue("LJ_ReasonforReturning");
		CaseStatus = larNumber + "~" + status;
		System.out.println("CaseStatus" + CaseStatus);
		return CaseStatus;

	}

	public String getDocumentPropertyValues(String folderId, ObjectStore os) {
		System.out.println("inside" + folderId+"os "+os.get_DisplayName());
		String allDocStatus = "";

		try {

			Folder folder = Factory.Folder.fetchInstance(os,new Id(folderId), null);
			folder.save(RefreshMode.REFRESH);
			System.out.println(folderId + "CaseNAME" + folder.get_FolderName());

			DocumentSet docs = folder.get_ContainedDocuments();
			Iterator it = docs.iterator();
			while (it.hasNext()) {
				Document doc = (Document) it.next();
				doc.save(RefreshMode.REFRESH);
				String docCode = doc.getProperties().getStringValue("LJ_DocumentCode");
				String docStatus = doc.getProperties().getStringValue("LJ_LVBDstatus");

				System.out.println(docCode + " :status : " + docCode);

				if (docStatus == null)
					docStatus = "";

				allDocStatus = allDocStatus + "~" + docCode + ":" + docStatus;
				System.out.println("CaseStatus" + allDocStatus);

			}
			System.out.println("allDocumentSatus" + allDocStatus);
		} catch (EngineRuntimeException eng) {
			eng.printStackTrace();
			System.out.println("ee"+eng.getMessage());
		}catch(Exception ex) {
			ex.printStackTrace();
			System.out.println("ex"+ex.getMessage());

		}
		return allDocStatus;

	}
}
