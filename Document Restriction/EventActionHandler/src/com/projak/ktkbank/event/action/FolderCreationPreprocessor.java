package com.projak.ktkbank.event.action;

import java.util.Iterator;

import com.filenet.api.action.*;
import com.filenet.api.collection.RepositoryRowSet;
import com.filenet.api.core.IndependentlyPersistableObject;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.core.RepositoryObject;
import com.filenet.api.constants.PropertyNames;
import com.filenet.api.exception.*;
import com.filenet.api.query.RepositoryRow;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;
import com.filenet.api.util.Id;
import com.projak.ktkbank.event.action.exception.DuplicateFolderException;

public class FolderCreationPreprocessor implements com.filenet.api.engine.ChangePreprocessor
{
   public boolean preprocessObjectChange(IndependentlyPersistableObject sourceObj)
   {
      try {
    	 System.out.println("Inside Custom PreProcessor");
         boolean checkFolderExist = false;

         PendingAction actions[] = sourceObj.getPendingActions();
         for ( int i = 0; i < actions.length && !checkFolderExist; i++ )
         {
            if ( actions[i] instanceof Create) {
            	checkFolderExist = true;
            	System.out.println("Create event triggered in custom PreProcessor");
            } 
            	
         }
         if ( !checkFolderExist ) return false;
         
         

         String custId = sourceObj.getProperties().getStringValue("CustomerID");
         System.out.println("Customer ID is "+ custId);
         
         String query = "SELECT Id FROM CKYCFolderClass WHERE CustomerID ='"+custId+"'";
 		
 		final SearchSQL sqlObject = new SearchSQL();
 		sqlObject.setQueryString(query);
 		System.out.println("The SQL Object is "+sqlObject);
 		
 		final SearchScope searchScope = new SearchScope(((RepositoryObject) sourceObj).getObjectStore());
 		final RepositoryRowSet rowSet = searchScope.fetchRows(sqlObject, null, null, new Boolean(true));
 		
 		final Iterator iter = rowSet.iterator();
 		
 		while(iter.hasNext()) {
 			RepositoryRow repositoryRow = (RepositoryRow) iter.next();
 		   	Id Id=repositoryRow.getProperties().get("Id").getIdValue();
 		   	System.out.println("Value of ID is "+Id.toString());
 			System.out.println("Inside Exception since Folder already present");
 			throw new DuplicateFolderException("Folder ID is already present");
 		}
 		System.out.println("New Customer ID");
 		return false;
      }
      catch (Exception e) {
         throw new RuntimeException(e);
      }
   }
}
