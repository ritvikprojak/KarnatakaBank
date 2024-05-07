package com.projak.karnatak.migration.filenet.utility;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Iterator;

import javax.security.auth.Subject;

import org.apache.log4j.Logger;

import com.filenet.api.collection.ContentElementList;
import com.filenet.api.collection.RepositoryRowSet;
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
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.query.RepositoryRow;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.projak.karnatak.migration.jpa.EntityCreation;
import com.projak.karnatak.migration.jpa.EntitySearch;
import com.projak.karnatak.migration.model.cases;
import com.projak.karnatak.migration.model.casesoutput;
import com.projak.karnatak.migration.model.document;
import com.projak.karnatak.migration.model.documentOutput;
import com.projak.karnatak.migration.utility.PropertyReader;

public class UploadUtilis {
	
	private static EntitySearch search = new EntitySearch();
	
	private static EntityCreation ec = new EntityCreation();

	final static Logger logger = Logger.getLogger(UploadUtilis.class);

	public synchronized void save(Document doc) {

		doc.save(RefreshMode.REFRESH);

	}

	public synchronized void save(Folder fold) {

		fold.save(RefreshMode.REFRESH);

	}

	public synchronized void save(ReferentialContainmentRelationship rcr) {

		rcr.save(RefreshMode.REFRESH);

	}

	public casesoutput createCase(cases input, Subject sub, ObjectStore OS) {

		casesoutput output = new casesoutput();

		UserContext.get().pushSubject(sub);

		Folder fold = getFolderByQuery(input.getLeadNumber(), sub, OS);

		if (fold == null) {

			fold = Factory.Folder.createInstance(OS, PropertyReader.getProperty("filenet.folder.class"));
			logger.info("Folder instance created");

			Folder parentFolder = OS.get_RootFolder();
			logger.info("Root Folder instance fetched");

			fold.set_FolderName(input.getLeadNumber());

			fold.getProperties().putValue("LOS_Leadnumber", input.getLeadNumber());
			output.setLeadNumber(input.getLeadNumber());

			fold.getProperties().putValue("LOS_MobileNumber", input.getMobileNumber());
			output.setMobileNumber(input.getMobileNumber());

			fold.getProperties().putValue("LOS_CustomerName", input.getCustomerName());
			output.setCustomerName(input.getCustomerName());

			fold.getProperties().putValue("LOS_ProductCode", input.getProductCode());
			output.setProductCode(input.getProductCode());

			fold.getProperties().putValue("LOS_BranchCode", input.getBranchCode());
			output.setBranchCode(input.getBranchCode());

			fold.getProperties().putValue("LOS_LoanStatus", input.getLoanStatus());
			output.setLoanStatus(input.getLoanStatus());

			fold.set_Parent(parentFolder);

			fold.getProperties().putValue("LOS_DisbursalDate", input.getDisbursalDate());
			output.setDisbursalDate(input.getDisbursalDate());

			fold.getProperties().putValue("LOS_ApprovalDate", input.getApprovalDate());
			output.setApprovalDate(input.getApprovalDate());

			fold.getProperties().putValue("LOS_ProposalNumber", input.getProposalNumber());
			output.setProposalNumber(input.getProposalNumber());

			fold.getProperties().putValue("LOS_SourceSystemName", input.getSourceSystemName());
			output.setSourceSystemName(input.getSourceSystemName());

			fold.getProperties().putValue("LOS_UCICCode", input.getUciccode());
			output.setUCICCode(input.getUciccode());

			fold.getProperties().putValue("LOS_Customerid", input.getCustomerId());
			output.setCustomerId(input.getCustomerId());

			logger.info("Folder creation : " + input.getLeadNumber());

			try {

				save(fold);

			} catch (EngineRuntimeException Ex) {
				logger.debug("Error", Ex);
				logger.error(Ex.fillInStackTrace());
				logger.error("Exception Code " + Ex.getExceptionCode() + "for " + Ex.getLocalizedMessage());
				output.setStatus("Failed");
				output.setMessage("Error");
				output.setFolderId(null);

				try {
//					EntityCreation ec = new EntityCreation();
					ec.persistObject(output);
					ec.updateObject(input);

				} catch (Exception ex) {
					logger.debug("Error", ex);
					logger.error(ex.fillInStackTrace());
					logger.error("Error Entering data in database for input case : " + input.toString());
				}
				UserContext.get().popSubject();
				return output;

			} catch (Exception ex) {
				logger.debug("Error", ex);
				logger.error(ex.fillInStackTrace());
				output.setStatus("Failed");
				output.setMessage("Error");
				output.setFolderId(null);

				try {
//					EntityCreation ec = new EntityCreation();
					ec.persistObject(output);
					ec.updateObject(input);

				} catch (Exception e) {
					logger.debug("Error", e);
					logger.error(e.fillInStackTrace());
					logger.error("Error Entering data in database for input case : " + input.toString());
				}
				UserContext.get().popSubject();
				return output;
			}

		} else {

			output.setLeadNumber(input.getLeadNumber());

			output.setMobileNumber(input.getMobileNumber());

			output.setCustomerName(input.getCustomerName());

			output.setProductCode(input.getProductCode());

			output.setBranchCode(input.getBranchCode());

			output.setLoanStatus(input.getLoanStatus());

			output.setDisbursalDate(input.getDisbursalDate());

			output.setApprovalDate(input.getApprovalDate());

			output.setProposalNumber(input.getProposalNumber());

			output.setSourceSystemName(input.getSourceSystemName());

			output.setUCICCode(input.getUciccode());

			output.setCustomerId(input.getCustomerId());

		}

		output.setStatus("Success");
		output.setMessage("NA");
		output.setFolderId(fold.get_Id().toString());

		try {
//			EntityCreation ec = new EntityCreation();
			ec.persistObject(output);
			ec.updateObject(input);

		} catch (Exception ex) {
			logger.debug("Error", ex);
			logger.error("Error Entering data in database for input case : " + input.toString());

		}

		return output;

	}

	public casesoutput createCase(cases input) {

		casesoutput output = new casesoutput();

		output.setLeadNumber(input.getLeadNumber());

		output.setMobileNumber(input.getMobileNumber());

		output.setCustomerName(input.getCustomerName());

		output.setProductCode(input.getProductCode());

		output.setBranchCode(input.getBranchCode());

		output.setLoanStatus(input.getLoanStatus());

		output.setDisbursalDate(input.getDisbursalDate());

		output.setApprovalDate(input.getApprovalDate());

		output.setProposalNumber(input.getProposalNumber());

		output.setSourceSystemName(input.getSourceSystemName());

		output.setUCICCode(input.getUciccode());

		output.setCustomerId(input.getCustomerId());

		output.setStatus("Success");

		output.setMessage("NA");

		output.setFolderId("Demo");

		try

		{
//			EntityCreation ec = new EntityCreation();
			ec.persistObject(output);
			ec.updateObject(input);

		} catch (Exception ex) {
			logger.debug("Error", ex);
			logger.error("Error Entering data in database for input case : " + input.toString());

		}

		return output;

	}

	public documentOutput createDocument(document input, Subject sub, ObjectStore OS) {

		documentOutput output = new documentOutput();

		UserContext.get().pushSubject(sub);

//		EntitySearch es = new EntitySearch();
		
		String docClass = search.getDocument(input.getDocCode());
		
		logger.info("Document Class "+docClass + " for input : "+input.toString());

		Document doc = Factory.Document.createInstance(OS, docClass);

		doc.getProperties().putValue("DocumentTitle", input.getDocumentTitle());
		output.setDocumentTitle(input.getDocumentTitle());

		doc.getProperties().putValue("DocCode", input.getDocCode());
		output.setDocCode(input.getDocCode());

		doc.getProperties().putValue("LeadNumber", input.getLeadNumber());
		output.setLeadNumber(input.getLeadNumber());

		doc.getProperties().putValue("ProposalNumber", input.getProposalNumber());
		output.setProposalNumber(input.getProposalNumber());

		doc.getProperties().putValue("kind", input.getKind());
		output.setKind(input.getKind());

		doc.getProperties().putValue("DocSubType", input.getDocSubType());
		output.setDocSubType(input.getDocSubType());
		
		try {

			save(doc);

		} catch (Exception Ex) {
			logger.debug("Error", Ex);
			logger.error(Ex.fillInStackTrace());
			output.setStatus("Failed");
			output.setMessage(Ex.getMessage());
		}

		UserContext.get().popSubject();

		return output;
	}

	public Folder getFolderByQuery(String folderName, Subject sub, ObjectStore OS) {

		String query = "Select ID from LoanCaseForm where FolderName = '" + folderName + "'";

		UserContext.get().pushSubject(sub);

		SearchScope scope = new SearchScope(OS);

		SearchSQL sql = new SearchSQL(query);

		Folder fold = null;

		RepositoryRowSet rowSet = scope.fetchRows(sql, null, null, null);

		if (!rowSet.isEmpty()) {

			@SuppressWarnings("unchecked")
			Iterator<RepositoryRow> itr = rowSet.iterator();

			while (itr.hasNext()) {

				RepositoryRow row = (RepositoryRow) itr.next();

				Id ID = row.getProperties().getIdValue("ID");

				fold = Factory.Folder.fetchInstance(OS, ID, null);

			}

		}

		return fold;
	}

	@SuppressWarnings("unchecked")
	public documentOutput createDocument(document input, String folderId, Subject sub, ObjectStore OS) {

		documentOutput output = new documentOutput();

		UserContext.get().pushSubject(sub);
		
//		EntitySearch es = new EntitySearch();

		String docClass = search.getDocument(input.getDocCode());
		
		logger.info("Document Class "+docClass + " for input : "+input.toString());
		
		if(docClass != null) {
			
			Document doc = Factory.Document.createInstance(OS, docClass);

			doc.getProperties().putValue("DocumentTitle", input.getDocumentTitle());
			output.setDocumentTitle(input.getDocumentTitle());

			doc.getProperties().putValue("LOS_DocCode", input.getDocCode());
			output.setDocCode(input.getDocCode());

			doc.getProperties().putValue("LOS_Leadnumber", input.getLeadNumber());
			output.setLeadNumber(input.getLeadNumber());

			doc.getProperties().putValue("LOS_ProposalNumber", input.getProposalNumber());
			output.setProposalNumber(input.getProposalNumber());

			doc.getProperties().putValue("LOS_Kind", input.getKind());
			output.setKind(input.getKind());

			doc.getProperties().putValue("LOS_Relation", input.getRelation());
			output.setKind(input.getKind());

			doc.getProperties().putValue("LOS_DocumentSubType", input.getDocSubType());
			output.setDocSubType(input.getDocSubType());

			ContentTransfer ctObject = Factory.ContentTransfer.createInstance();
			FileInputStream fileIS = null;

			try {

				String mimeType = PropertyReader.getProperty(
						input.getPath().substring(input.getPath().lastIndexOf(".") + 1, input.getPath().length()));
				ctObject.set_ContentType(mimeType);

			} catch (Exception ex) {
				logger.debug("Error", ex);
				logger.error(ex.fillInStackTrace());
				logger.error("Error with the Mime Type Identification for input : " + input.toString());
				String tempMessage = null;
				if (output.getMessage() != null) {
					tempMessage = output.getMessage() + ", Error with the Mime Type Identification for input";
				} else {
					tempMessage = "Error with the Mime Type Identification for input";
				}
				output.setMessage(tempMessage);

			}

			try {
				output.setPath(input.getPath());
				output.setDocumentTitle(input.getDocumentTitle());
				File file = new File(input.getPath());
				fileIS = new FileInputStream(file);
				ContentElementList contentList = Factory.ContentElement.createList();

				if (fileIS != null) {

					ctObject.setCaptureSource(fileIS);

				}
				contentList.add(ctObject);
				doc.set_ContentElements(contentList);

			} catch (FileNotFoundException e) {
				logger.debug("Error", e);
				logger.error(e.fillInStackTrace());
				output.setStatus("Failed");
				logger.error("File not found  : " + input.toString());
				String tempMessage = null;
				if (output.getMessage() != null) {
					tempMessage = output.getMessage() + ",File not found for input";
				} else {
					tempMessage = "File not found for input";
				}
				output.setMessage(tempMessage);

			}

			try {

				doc.checkin(AutoClassify.DO_NOT_AUTO_CLASSIFY, CheckinType.MAJOR_VERSION);
				save(doc);

			} catch (Exception Ex) {
				logger.debug("Error", Ex);
				logger.error(Ex.fillInStackTrace());
				output.setStatus("Failed");
				String tempMessage = null;
				if (output.getMessage() != null) {
					tempMessage = output.getMessage() + Ex.getLocalizedMessage();
				} else {
					tempMessage = Ex.getLocalizedMessage();
				}
				output.setMessage(tempMessage);
				return output;

			}

			try {

				Folder fold = Factory.Folder.fetchInstance(OS, new Id(folderId), null);

				ReferentialContainmentRelationship rcr = fold.file(doc, AutoUniqueName.AUTO_UNIQUE, null,
						DefineSecurityParentage.DEFINE_SECURITY_PARENTAGE);

				save(rcr);

			} catch (Exception ex) {
				logger.debug("Error", ex);
				logger.error(ex.fillInStackTrace());
				String tempMessage = null;
				logger.error("Error while creating relation between Folder and Document");
				if (output.getMessage() != null) {
					tempMessage = output.getMessage() + "Error while creating relation between Folder and Document";
				} else {
					tempMessage = "Error while creating relation between Folder and Document";
				}
				output.setMessage(tempMessage);
				return output;
			}

			UserContext.get().popSubject();
			output.setStatus("Success");
			if (output.getMessage() == null) {
				output.setMessage("NA");
			}
		}else {
			logger.error("Document Class null for input : "+input.toString());
		}
		
		return output;

	}

//	@SuppressWarnings("unchecked")
	public void createDocument(document input) {

		documentOutput output = new documentOutput();
		
//		EntitySearch es = new EntitySearch();

//		String docClass = EntitySearch.getDocument(input.getDocCode());

		output.setDocumentTitle(input.getDocumentTitle());

		output.setDocCode(input.getDocCode());

		output.setLeadNumber(input.getLeadNumber());

		output.setProposalNumber(input.getProposalNumber());

		output.setKind(input.getKind());

		output.setKind(input.getKind());

		output.setDocSubType(input.getDocSubType());

		output.setPath(input.getPath());
		
		output.setDocumentTitle(input.getDocumentTitle());

		output.setStatus("Success");
		
		output.setMessage("NA");
		
		try

		{
//			EntityCreation ec = new EntityCreation();
			ec.persistObject(output);

		} catch (Exception ex) {
			logger.debug("Error", ex);
			logger.error(ex.fillInStackTrace());
			ex.printStackTrace();
			logger.error(
					"Error while creating entry for document output : " + output.toString());

		}
	}
}
