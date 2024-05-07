package com.projak.karnatak.migration.scheduler.job;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.projak.karnatak.migration.connection.CEConnection;
import com.projak.karnatak.migration.filenet.utility.UploadUtilis;
import com.projak.karnatak.migration.jpa.EntityCreation;
import com.projak.karnatak.migration.model.document;
import com.projak.karnatak.migration.model.documentOutput;
import com.projak.karnatak.migration.scheduler.latch.ILatch;

public class UploadJob implements Job {

	final static Logger logger = Logger.getLogger(UploadJob.class);

	public static int count, jobCount = 0;

	public static ArrayList<Map<String, List<document>>> inputList = null;

	public void execute(JobExecutionContext jobContext) throws JobExecutionException {

		JobDetail jobDetail = jobContext.getJobDetail();
		ILatch latch = (ILatch) jobDetail.getJobDataMap().get("latch");
		@SuppressWarnings("unchecked")
		ArrayList<Map<String, List<document>>> inputList = (ArrayList<Map<String, List<document>>>) jobDetail
				.getJobDataMap().get("inputList");
		UploadUtilis utils = (UploadUtilis) jobDetail.getJobDataMap().get("uploadUtilis");
		CEConnection ce = (CEConnection) jobDetail.getJobDataMap().get("ce");

		if (!inputList.isEmpty()) {

			if (inputList.size() >= jobCount) {
				jobCount++;
				Map<String, List<document>> input = inputList.get(count++);

				if (!input.isEmpty()) {
					Iterator<String> key = input.keySet().iterator();

					while (key.hasNext()) {
						String folderId = key.next();
						List<document> docList = input.get(folderId);
						logger.info("Document size for folder " + folderId + " : " + docList.size());
						int i = 0;
						for (document document : docList) {
							
							logger.info("Creating document : " + document.getDocumentTitle());
							if (document.getPath() != null && !document.getPath().isEmpty()) {
								logger.info("Document Path : " + document.getPath());
								documentOutput docOutput = new documentOutput(); // changed null to initialized

								try {

//									docOutput = utils.createDocument(document, folderId, ce.getSubject(), ce.getOs());
									utils.createDocument(document);
								} catch (Exception ex) {
									logger.error(ex.fillInStackTrace());
									logger.debug("Error", ex);

								}
							} else {
								logger.info("DOcument path Empty : " + document.toString());
							}
							docList.removeAll(docList.subList(i, i++));
//							docList.subList(i, i++).clear();
							System.out.println("Value of I : "+i);
						}
						docList = null;
//						System.gc();
					}
					latch.countDown();

				}

			} else {

			}

		} else {
			latch.countDown();
		}

	}
	
	private synchronized void sync(List<document> doc,document document) {
		doc.remove(document);
	}

}
