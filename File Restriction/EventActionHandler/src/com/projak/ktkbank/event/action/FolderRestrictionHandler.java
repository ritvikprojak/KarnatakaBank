package com.projak.ktkbank.event.action;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.logging.Logger;

import com.filenet.api.collection.RepositoryRowSet;
import com.filenet.api.constants.RefreshMode;
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

public class FolderRestrictionHandler implements EventActionHandler{
	
	//private static final String CLASS_NAME = FolderRestrictionHandler.class.getName();
	//private static Logger logger = Logger.getLogger( CLASS_NAME );

	
	public void onEvent(ObjectChangeEvent arg0, Id arg1) throws EngineRuntimeException {
		
		System.out.println("Inside FolderRestrictionHandler");
		boolean flag = false;
		boolean folderFlag = false;
		int custFolderCount=0;
		int folderCount=0;
		Id id = arg0.get_SourceObjectId();
		System.out.println("Source Id is "+id.toString());
		ObjectStore os = arg0.getObjectStore();
		Folder fold = (Folder) arg0.get_SourceObject();
		System.out.println("Folder Object is " +fold);
		
		
		String custId = fold.getProperties().getStringValue("KYC_CustomerID");
		System.out.println("Customer Id is "+custId);
		
		String cmisFolderName = fold.getProperties().getStringValue("FolderName");
		System.out.println("Folder Name is "+cmisFolderName);
		System.out.println("Folder Name Length is "+cmisFolderName.length());
		
		// Restrict folder creation if size of folder is more than 9 characters
		if(!((cmisFolderName.length()) == 9) || !((custId.length()) == 9)) {
			System.out.println("Restricting Folder creation as Folder Name or Customer ID doesn't have 9 Characters");
			throw new EngineRuntimeException(ExceptionCode.E_CONSTRAINT_VIOLATED, "Folder Name or Customer ID doesn't have 9 Characters");
		}
		
		Calendar calendar = Calendar.getInstance();
	    calendar.setTime(new Date());

	    calendar.add(Calendar.DAY_OF_MONTH, -1);

	    Date date2 = calendar.getTime();
	    SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("EEEE");
		simpleDateFormat2 = new SimpleDateFormat("YYYYMMdd'T'");
	    final String testDate = simpleDateFormat2.format(date2);
		
		//String queryDate = testDate+"182900Z";
		
		//String query = "SELECT Id, PathName, FolderName FROM CKYCFolderClass WHERE CustomerID ='"+custId+"' AND DateCreated <="+queryDate;
		
		String query = "SELECT Id, PathName, FolderName FROM CKYCFolderClass WHERE KYC_CustomerID ='"+custId+"'";
		
		final SearchSQL sqlObject = new SearchSQL();
		sqlObject.setQueryString(query);
		System.out.println("The SQL Object is "+sqlObject);
		
		final SearchScope searchScope = new SearchScope(arg0.getObjectStore());
		final RepositoryRowSet rowSet = searchScope.fetchRows(sqlObject, null, null, new Boolean(true));
		
		final Iterator iter = rowSet.iterator();
		
		while(iter.hasNext()) {
			flag = true;
			custFolderCount ++;
			System.out.println("Inside while loop");
			RepositoryRow repositoryRow = (RepositoryRow) iter.next();
			Id oldId = repositoryRow.getProperties().getIdValue("Id");
			System.out.println("Old ID is "+oldId.toString());
			
			if(custFolderCount > 2) {
				break;
			}
			//String folderExistPath = pathName.substring(0, pathName.lastIndexOf("/"));
			
			//Folder existFolder = Factory.Folder.fetchInstance(os, folderExistPath, null);
			//Folder eventFolder = Factory.Folder.fetchInstance(os, id, null);
			//eventFolder.set_Parent(existFolder);
			//eventFolder.save(RefreshMode.NO_REFRESH);
			//System.out.println("Trying to create new folder in existing path");
		   	//break;
			//throw new DuplicateFolderException("Folder is already present for Customer ID "+custId);
			//throw new FolderAlreadyExistsException("Folder is already present for Customer ID "+custId);
		}
		System.out.println("Total Folders with same Customer ID is "+custFolderCount);
		
		
		String folderQuery = "SELECT Id, FolderName FROM CKYCFolderClass WHERE FolderName ='"+cmisFolderName+"'";
		
		final SearchSQL folderSqlObject = new SearchSQL();
		folderSqlObject.setQueryString(folderQuery);
		System.out.println("The SQL Object is "+folderSqlObject);
		
		final SearchScope folderSearchScope = new SearchScope(arg0.getObjectStore());
		final RepositoryRowSet folderRowSet = folderSearchScope.fetchRows(folderSqlObject, null, null, new Boolean(true));
		
		final Iterator folderIter = folderRowSet.iterator();
		
		while(folderIter.hasNext()) {
			folderFlag = true;
			folderCount ++;
			System.out.println("Inside Folder while loop");
			RepositoryRow repositoryRow = (RepositoryRow) folderIter.next();
			String folderId = repositoryRow.getProperties().getIdValue("Id").toString();
			System.out.println("Existing Folder ID for the folder name is "+folderId);
			
			if(folderCount > 2) {
				break;
			}
		}
		System.out.println("Total Folders with same Customer ID is "+folderCount);
		
		if(custFolderCount<=1 && folderCount<=1) {
			System.out.println("Folder not present");
			
			final Date folderDate = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("EEEE");
			simpleDateFormat = new SimpleDateFormat("YYYY");
		    final String year = simpleDateFormat.format(folderDate);
			simpleDateFormat = new SimpleDateFormat("MMM");
		    final String month = simpleDateFormat.format(folderDate).toUpperCase();
		    simpleDateFormat = new SimpleDateFormat("MM");
		    final String monthNumber = simpleDateFormat.format(folderDate);
	        simpleDateFormat = new SimpleDateFormat("dd");
		    final String date = simpleDateFormat.format(folderDate);
		    String folderName = date + "-" + monthNumber + "-" + year;
		    
		    String parentFolder = "/CKYC";
			String folderPath;
			Folder folder;
			Folder yearFolder;
			Folder monthFolder;
			boolean folderflag = false;
			boolean monthFlag = false;
			boolean yearFlag = false;
			
			System.out.println("Date Variables initialized");
			
			try{
				folderPath = parentFolder +"/"+year;
				yearFolder = Factory.Folder.fetchInstance(os, folderPath, null);
				System.out.println("Year folder already exists...skipping...");
			}catch (EngineRuntimeException ere) {
	            ExceptionCode code = ere.getExceptionCode();
	            if (code != ExceptionCode.E_NOT_UNIQUE) {
	            	System.out.println("Year folder doesn't exist");
	            	yearFlag = true;
	            }
	        }
			
			
			try{
				folderPath = parentFolder +"/"+year+"/"+month;
				monthFolder = Factory.Folder.fetchInstance(os, folderPath, null);
				System.out.println("Month folder already exists...skipping...");
			}catch (EngineRuntimeException ere) {
	            ExceptionCode code = ere.getExceptionCode();
	            if (code != ExceptionCode.E_NOT_UNIQUE) {
	            	System.out.println("Month folder doesn't exist");
	            	monthFlag = true;
	            }
	        }
			
			
			try{
				folderPath = parentFolder +"/"+year+"/"+month+"/"+folderName;
				folder = Factory.Folder.fetchInstance(os, folderPath, null);
				System.out.println("Date folder already exists...skipping...");
			}catch (EngineRuntimeException ere) {
	            ExceptionCode code = ere.getExceptionCode();
	            if (code != ExceptionCode.E_NOT_UNIQUE) {
	            	System.out.println("Date folder doesn't exist");
	            	folderflag = true;
	            }
	        }
			finally{
				if(yearFlag) {
					Folder newFolder = Factory.Folder.createInstance(os, null);
					Folder parent = Factory.Folder.fetchInstance(os, parentFolder, null);
					newFolder.set_Parent(parent);
					newFolder.set_FolderName(year);
					newFolder.save(RefreshMode.NO_REFRESH);
					System.out.println("Year Folder Created");
				}
				if(monthFlag){
					Folder newFolder = Factory.Folder.createInstance(os, null);
					String monthPath = parentFolder+"/"+year;
					Folder parent = Factory.Folder.fetchInstance(os, monthPath, null);
					newFolder.set_Parent(parent);
					newFolder.set_FolderName(month);
					newFolder.save(RefreshMode.NO_REFRESH);
					System.out.println("Month Folder Created");
				}
				if(folderflag){
					Folder newFolder = Factory.Folder.createInstance(os, null);
					String path = folderPath = parentFolder +"/"+year+"/"+month;
					Folder parent = Factory.Folder.fetchInstance(os, path, null);
					newFolder.set_Parent(parent);
					newFolder.set_FolderName(folderName);
					newFolder.save(RefreshMode.NO_REFRESH);
					System.out.println("Day Folder Created");
				}
				String dateFolder = folderPath = parentFolder +"/"+year+"/"+month+"/"+folderName;
				folder = Factory.Folder.fetchInstance(os, dateFolder, null);
				Folder eventFolder = Factory.Folder.fetchInstance(os, id, null);
				eventFolder.set_Parent(folder);
				eventFolder.save(RefreshMode.NO_REFRESH);
				System.out.println("Customer Folder Created");
			}
		}else if(folderCount > 1 && custFolderCount > 1){
			System.out.println("Folder Name "+cmisFolderName+" and Customer Id folder "+custId+" are already present");
			String message = "Folder Name "+cmisFolderName+" and Customer Id folder "+custId+" are already present";
			//throw new FolderAlreadyExistsException(message);
			throw new EngineRuntimeException(ExceptionCode.E_CONSTRAINT_VIOLATED, message);
		}else if(folderCount > 1){
			System.out.println("Folder Name is already present "+cmisFolderName);
			String message = "Folder Name is already present "+cmisFolderName;
			//throw new FolderAlreadyExistsException(message);
			throw new EngineRuntimeException(ExceptionCode.E_CONSTRAINT_VIOLATED, message);
		}else {
			System.out.println("Folder is already present for Customer ID "+custId);
			String message = "Folder is already present for Customer ID "+custId;
			//throw new FolderAlreadyExistsException(message);
			throw new EngineRuntimeException(ExceptionCode.E_CONSTRAINT_VIOLATED, message);
		}
	}

}
