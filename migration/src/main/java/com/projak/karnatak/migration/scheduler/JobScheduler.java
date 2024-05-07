package com.projak.karnatak.migration.scheduler;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.hibernate.service.spi.ServiceException;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import com.filenet.api.exception.EngineRuntimeException;
import com.projak.karnatak.migration.connection.CEConnection;
import com.projak.karnatak.migration.filenet.utility.UploadUtilis;
import com.projak.karnatak.migration.jpa.EntitySearch;
import com.projak.karnatak.migration.model.cases;
import com.projak.karnatak.migration.model.casesoutput;
import com.projak.karnatak.migration.model.document;
import com.projak.karnatak.migration.scheduler.job.UploadJob;
import com.projak.karnatak.migration.scheduler.latch.ILatch;
import com.projak.karnatak.migration.utility.PropertyReader;

public class JobScheduler implements ILatch {

	final static Logger logger = Logger.getLogger(JobScheduler.class);

	private CountDownLatch latch = null;

//	private static SchedulerFactory schedFactory = new StdSchedulerFactory();

	public static int countL = 0;

	private int repeatCount = 0;

	private String executionPeriod = PropertyReader.getProperty("executionPeriod");

	private String sleep = PropertyReader.getProperty("sleep");

	private String bufferPeriod = PropertyReader.getProperty("bufferPeriod");

	public void mainScheduler() throws SchedulerException {

		LocalDateTime startTime = LocalDateTime.now();
		logger.info("Start Time of main Scheduler : " + startTime);

		MainLoop: while (true) {

			LocalDateTime time = LocalDateTime.now();

			LocalDateTime lastTime = time.plusMinutes(20);

			ChildLoop: while (time.compareTo(lastTime) < 0) {

				countL++;
				String jobName = "job" + countL;
				String triggerName = "trigger" + countL;

				if (repeatCount >= 3) {

					break ChildLoop;

				}
				fireClass(jobName, triggerName);
//				logger.info("FireClass method call done");
				time = LocalDateTime.now();
				logger.info("Batch Completed at : " + time);
				try {
					System.gc();
					Thread.sleep(Integer.parseInt(sleep));
				} catch (InterruptedException e) {
					logger.debug("Error", e);
					logger.error("Child Scheduler Thread Interrupted");

				}

			}

			logger.info("RepeatCount Before : " + repeatCount);

			if (repeatCount >= 3) {

				logger.info("RepeatCount : " + repeatCount);
				break MainLoop;

			}

			logger.info("CountL : " + countL);

			try {

				Thread.sleep(Integer.parseInt(bufferPeriod));
			} catch (InterruptedException e) {
				logger.debug("Error", e);
				logger.error("Main Scheduler Thread Interrupted");

			}

		}

		LocalDateTime endTime = LocalDateTime.now();

		LocalDateTime tempDateTime = LocalDateTime.from(startTime);

		long hours = tempDateTime.until(endTime, ChronoUnit.HOURS);
		tempDateTime = tempDateTime.plusHours(hours);

		long minutes = tempDateTime.until(endTime, ChronoUnit.MINUTES);
		tempDateTime = tempDateTime.plusMinutes(minutes);

		long seconds = tempDateTime.until(endTime, ChronoUnit.SECONDS);

		logger.info("Total Time : " + hours + " : " + minutes + " : " + seconds);

	}

	public void fireClass(String jobName, String triggerName) {

		List<cases> caseList = null;
		EntitySearch search = new EntitySearch();

		try {
			logger.info("Getting Cases");
			caseList = search.getCases();
			logger.info("Case List Empty : " + caseList.isEmpty());

			if (caseList.isEmpty() || caseList == null) {

				repeatCount++;

			}

		} catch (ServiceException se) {
			logger.debug("Error", se);
			logger.error(se.fillInStackTrace());

			se.printStackTrace();

			try {

				Thread.sleep(60000);

			} catch (InterruptedException e) {
				logger.debug("Error", e);
				logger.error(e.fillInStackTrace());

			}

//			return "Getting Cases Failed";

		} catch (Exception ex) {
			logger.debug("Error", ex);

//			logger.error(ex.fillInStackTrace());
//			return "Getting Cases Failed";

		}

		logger.info("Cases from DB fetched");
		UploadUtilis utils = new UploadUtilis();
		CEConnection ce = new CEConnection();

		try {

			ce.establishConnection(PropertyReader.getProperty("filenet.userId"),
				PropertyReader.getProperty("filenet.password"));

			logger.info("Connection Successful");

		} catch (EngineRuntimeException eex) {
			logger.debug("Error", eex);
			logger.error(eex.getExceptionCode().getErrorId());
			logger.error(eex.fillInStackTrace());

			try {

				Thread.sleep(60000);

			} catch (InterruptedException e) {
				logger.debug("Error", e);
				logger.error(e.fillInStackTrace());

			}

//			return "Connection Failed, error code : " + eex.getExceptionCode().getErrorId();

		} catch (Exception ex) {
			logger.debug("Error", ex);
			logger.error(ex.getLocalizedMessage());
			logger.error(ex.fillInStackTrace());

//			return "Connection Failed";

		}

		JobDataMap data = new JobDataMap();
		data.put("latch", this);
		data.put("uploadUtilis", utils);
		data.put("ce", ce);
		ArrayList<Map<String, List<document>>> inputList = new ArrayList<Map<String, List<document>>>();

		for (cases cse : caseList) {

			try {

//			casesoutput caseoutput = utils.createCase(cse, ce.getSubject(), ce.getOs());
				casesoutput caseoutput = utils.createCase(cse);
				logger.info("Cases Created");
				List<document> documentList = new ArrayList<document>();

				try {

					documentList = search.getDocuments(caseoutput);
					if (caseoutput.getFolderId() != null && !documentList.isEmpty()) {

						Map<String, List<document>> input = new HashMap<String, List<document>>();
						input.put(caseoutput.getFolderId(), documentList);
						inputList.add(input);

					} else {

						logger.info("FolderId is not present for leadNumber" + caseoutput.getLeadNumber());

					}

				} catch (Exception ex) {
					logger.debug("Error", ex);
					logger.error(ex.fillInStackTrace());
					logger.error("Error on getting document list : " + caseoutput.toString());

				}finally {
					
					caseoutput = null;
					
				}
				

			} catch (Exception ex) {
				logger.debug("Error", ex);
				logger.error(ex.fillInStackTrace());
				logger.error("Error creating case, please find leadnumber for the same : " + cse.getLeadNumber());

			}

		}
		caseList.clear();
		caseList = null;
		System.gc();

		latch = new CountDownLatch(inputList.size());
		data.put("inputList", inputList);
		JobBuilder jobBuilder = JobBuilder.newJob(UploadJob.class);
		UploadJob.count = 0;
		JobDetail jobDetail = jobBuilder.usingJobData(data).withIdentity(jobName, "group1").build();
		Trigger startTrigger = TriggerBuilder.newTrigger().withIdentity(triggerName, "group1")
				.withSchedule(SimpleScheduleBuilder.repeatSecondlyForever().withIntervalInMilliseconds(1000)).build();
		logger.info("Job and Trigger Initialized ");

		if (!inputList.isEmpty()) {
			

			try {

				try {

					SchedulerFactory schedulerFactory = new StdSchedulerFactory();
					Scheduler scheduler = schedulerFactory.getScheduler();
					scheduler.start();
					logger.info("Child Scheduler started at : " + LocalDateTime.now());
					scheduler.scheduleJob(jobDetail, startTrigger);
					latch.await(Long.parseLong(PropertyReader.getProperty("scheduler.await")), TimeUnit.MINUTES);
					logger.info("Scheduler for Job " + jobName + " finished at " + LocalDateTime.now());
					shutDown(scheduler);
					inputList = null;
					System.gc();
					
				} catch (SchedulerException e) {
					logger.debug("Error", e);
					logger.error(e.fillInStackTrace());
//					return "Scheduler creation Failed";

				}


			} catch (InterruptedException ex) {
				logger.debug("Error", ex);
				logger.error(ex.fillInStackTrace());
				logger.error("Error waiting latch method");

			} catch (Exception ex) {
				logger.debug("Error", ex);
				logger.error(ex.fillInStackTrace());
			}
		}
//		inputList.clear();
		inputList = null;
//		return null;

	}

	public static void shutDown(Scheduler scheduler) {
		if (scheduler != null) {
			try {
				scheduler.clear();
				scheduler.shutdown();
				scheduler = null;
				UploadJob.inputList = null;
				UploadJob.jobCount = 0;
			} catch (SchedulerException e) {
				logger.debug("Error", e);
				logger.error(e.fillInStackTrace());
				logger.error("Error shutting down Scheduler");
			}
		}
	}

	public void countDown() {
		latch.countDown();
	}

}
