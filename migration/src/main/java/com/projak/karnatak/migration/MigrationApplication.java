package com.projak.karnatak.migration;

import org.apache.log4j.Logger;
import org.quartz.SchedulerException;

import com.projak.karnatak.migration.scheduler.JobScheduler;

public class MigrationApplication {
	
	final static Logger logger = Logger.getLogger(MigrationApplication.class);

	public static void main(String[] args) {
		JobScheduler scheduler = new JobScheduler();
		try {
			scheduler.mainScheduler();
		} catch (SchedulerException e) {
			logger.debug("Error :",e);
			logger.error(e.fillInStackTrace());
			System.out.println("Main Scheduler Exception");
		}catch(Exception ex) {
			logger.debug("Error :",ex);
			logger.error(ex.fillInStackTrace());
		}
	}

}
