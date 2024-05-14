package com.projak.ktkbank.event.action;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.logging.Logger;

import com.filenet.api.collection.RepositoryRowSet;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.engine.EventActionHandler;
import com.filenet.api.events.ObjectChangeEvent;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.exception.ExceptionCode;
import com.filenet.api.query.RepositoryRow;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;
import com.filenet.api.util.Id;
import com.projak.ktkbank.event.action.exception.DuplicateFolderException;
import com.projak.ktkbank.event.action.exception.FolderAlreadyExistsException;
import org.apache.chemistry.opencmis.commons.exceptions.CmisBaseException;
import org.apache.chemistry.opencmis.commons.exceptions.CmisConstraintException;

public class DocumentRestrictionHandler implements EventActionHandler{
	
	//private static final String CLASS_NAME = FolderRestrictionHandler.class.getName();
	//private static Logger logger = Logger.getLogger( CLASS_NAME );

	
	public void onEvent(ObjectChangeEvent arg0, Id arg1) throws EngineRuntimeException {
		
		System.out.println("Inside DocumentRestrictionHandler");
		
		Id id = arg0.get_SourceObjectId();
		System.out.println("Source Id is "+id.toString());
		ObjectStore os = arg0.getObjectStore();
		Document doc = (Document) arg0.get_SourceObject();
		System.out.println("Document Object is " +doc);
		
		
		String custId = doc.getProperties().getStringValue("KYC_CustomerID");
		System.out.println("Customer Id is "+custId);
		
		// Restrict Document creation if size of customer ID is not 9 characters
		if(!(custId.length() == 9)) {
			System.out.println("Restricting Document creation as Customer ID doesn't have 9 Characters");
			throw new EngineRuntimeException(ExceptionCode.E_CONSTRAINT_VIOLATED, "Customer Id in Document doesn't have 9 Characters");
		}else {
			System.out.println("Document is getting created");
		}
	
	}

}
