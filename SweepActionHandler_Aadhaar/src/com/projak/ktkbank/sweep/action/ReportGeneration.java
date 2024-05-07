package com.projak.ktkbank.sweep.action;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.filenet.api.engine.HandlerCallContext;
import com.opencsv.CSVWriter;
import com.projak.ktkbank.sweep.action.EmailGeneration;

public class ReportGeneration {
	
	public Boolean generateReport(List<String[]> reportData, HandlerCallContext hcc) {
		
		hcc.traceDetail("Entering SweepHandlerReportGeneration.onSweep");
		System.out.println("Entering SweepHandlerReportGeneration.onSweep");
		reportData.add(0,new String[] {"ID", "Status"});
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		String folderPath = "/aadhaar/Aadhaar Sweep Reports/";
		String filePath = folderPath + "KYC_Delete_Sweep_Job_"+dateFormat.format(date)+".csv";
		File folder = new File(folderPath);
		File file = new File(filePath);
		try {
			if(!folder.exists()) {
				System.out.println("Folder doesn't exist");
	    		folder.mkdirs();
	    		System.out.println("Folder Created");
	    	}
			hcc.traceDetail("File retrieved SweepHandlerReportGeneration.onSweep");
			System.out.println("File retrieved SweepHandlerReportGeneration.onSweep");
			FileWriter outputfile = new FileWriter(file);
			CSVWriter writer = new CSVWriter(outputfile); 
			writer.writeAll(reportData); 
			writer.close();
			hcc.traceDetail("File created SweepHandlerReportGeneration.onSweep");
			System.out.println("File created SweepHandlerReportGeneration.onSweep");
			
			//EmailGeneration emailGenerator = new EmailGeneration();
		    //Boolean emailSuccessful=emailGenerator.sendEmail(filePath, hcc);
		    //hcc.traceDetail("Value of Email generation is "+emailSuccessful.toString());
		    //System.out.println("Value of Email generation is "+emailSuccessful.toString());
			return true;
		} catch (IOException e) {
			hcc.traceDetail("Exception in SweepHandlerReportGeneration"+e.getMessage());
			System.out.println("Exception in SweepHandlerReportGeneration"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	
}
