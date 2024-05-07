package com.projak.customwidget;

import java.io.InputStream;
import java.util.Iterator;

import com.filenet.api.collection.ContentElementList;
import com.filenet.api.collection.IndependentObjectSet;
import com.filenet.api.constants.AutoClassify;
import com.filenet.api.constants.CheckinType;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.ContentTransfer;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.core.ReferentialContainmentRelationship;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;

public class AddDocument {

	public String filingDocument(ObjectStore TargetObjectstore, InputStream is, String mergeCaseID, String CaseType)

	{
		ContentElementList Contentlist = Factory.ContentElement.createList();
		Document document = Factory.Document.createInstance(TargetObjectstore, "Document");

		ContentTransfer content = Factory.ContentTransfer.createInstance();
		content.setCaptureSource(is);
		Contentlist.add(content);
		document.set_ContentElements(Contentlist);
		document.checkin(AutoClassify.AUTO_CLASSIFY, CheckinType.MAJOR_VERSION);
		document.save(RefreshMode.REFRESH);

		// prop=gep.getpropertyFile();
		System.out.println("insidefiling");
		System.out.println("inside-----------filing");
		SearchSQL SearchSQL = new SearchSQL("Select * from " + CaseType + " where ID='" + mergeCaseID + "'");

		SearchScope searchScope = new com.filenet.api.query.SearchScope(TargetObjectstore);

		IndependentObjectSet objIndependentObjectSet = searchScope.fetchObjects(SearchSQL, null, null, true);

		System.out.println("folderis---" + objIndependentObjectSet.isEmpty());
		Iterator objIterator = objIndependentObjectSet.iterator();
		while (objIterator.hasNext()) {

			Folder FilingFolder = (Folder) objIterator.next();

			FilingFolder.save(com.filenet.api.constants.RefreshMode.REFRESH);
			// Folder
			// FilingFolder=Factory.Folder.fetchInstance(TargetObjectstore,"/GELMPOC",
			// null);

			System.out.println("FolderName---" + FilingFolder.get_FolderName());

			ReferentialContainmentRelationship fileDocuments = FilingFolder.file(document,
					com.filenet.api.constants.AutoUniqueName.AUTO_UNIQUE, document.get_Name(), null);

			fileDocuments.save(com.filenet.api.constants.RefreshMode.REFRESH);

			System.out.println("DocumentFiliedSucessfully---");
			return "Success";
		}
		return "Failed";
	}

}
