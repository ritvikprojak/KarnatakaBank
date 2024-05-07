package com.projak.aadharMasking;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
//import java.util.logging.Logger;
import java.util.Map;
import java.util.HashMap;

import org.json.JSONObject;

import org.apache.log4j.*;
import com.projak.aadharMasking.Config.ConfigReader;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import java.util.concurrent.TimeUnit;

public class Masking {
	
	//private static final String CLASS_NAME = AadharMasking.class.getName();
	//private static Logger logger = Logger.getLogger( CLASS_NAME );
	
	static Logger log = Logger.getLogger(Masking.class.getName());
	
	public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    public JSONObject maskDocument(String encoded, String filename) throws Exception {
    	String apiResponse = null;
    	Boolean manualMask=true;
    	String processCount = "0";
    	
    	//boolean isMask = false;
    	boolean isMask = true;
    	String originalImageURL;
    	String enhancedImageURL;
    	boolean isBright = false;
    	boolean isPoorDPI = false;
    	boolean qcRequired = true;
    	String attempt = "";
    	String recommendation = "";
    	int dpi = 0;
    	int minBrightness = 0;
    	int maxBrightness = 0;
    	
    	final int connectTimeout = Integer.parseInt(ConfigReader.getResourceBundle().getProperty("API_Connect_Timeout"));
    	final int writeTimeout = Integer.parseInt(ConfigReader.getResourceBundle().getProperty("API_Write_Timeout"));
    	final int readTimeout = Integer.parseInt(ConfigReader.getResourceBundle().getProperty("API_Read_Timeout"));
    	
    	JSONObject enhanceObj = new JSONObject();
        enhanceObj.put("_img", encoded);
        enhanceObj.put("_filename", filename);
        
    	
        
        JSONObject obj = new JSONObject();
        
        OkHttpClient client = new OkHttpClient.Builder().connectTimeout(connectTimeout, TimeUnit.SECONDS).writeTimeout(writeTimeout, TimeUnit.SECONDS).readTimeout(readTimeout, TimeUnit.SECONDS).build();
        
       /* RequestBody enhanceBody = RequestBody.create(JSON, enhanceObj.toString());
		log.info("RequestBody for Enhancement API::: "+enhanceBody);
        Request enhanceRequest = new Request.Builder().url(ConfigReader.getResourceBundle().getProperty("Post_Service_Enhancement_URL")).post(enhanceBody).build();
        
        long enhanceStartTime = System.currentTimeMillis();
        try (Response response = client.newCall(enhanceRequest).execute()) {
        	long endTime = System.currentTimeMillis();
	        long processTimeMillis = endTime - enhanceStartTime;
	        long processTimeSeconds = processTimeMillis / 1000;
	        long minutes = processTimeSeconds / 60;
	        log.info("Enhancement API Response Time::: " + processTimeMillis + " MILLISECONDS, " + processTimeSeconds + " SECONDS, " + minutes % 60 + " MINUTES.");
		   	
		   	if (!response.isSuccessful()) throw new IOException("Unexpected code while calling Enhancement API ==> " + response);
        	
        	apiResponse = response.body().string();
        	JSONObject jsonObject = new JSONObject(apiResponse);
        	
        	if(jsonObject.getString("app_msg").equalsIgnoreCase("OK")) {
        		isMask = true;
        		isBright = jsonObject.getBoolean("is_bright");
        		isPoorDPI = jsonObject.getBoolean("is_poor_DPI");
        		dpi = jsonObject.getInt("_dpi");
        		minBrightness = jsonObject.getInt("_beta");
        		maxBrightness = jsonObject.getInt("_alpha");
        		recommendation = jsonObject.getString("_suggstn");
        		originalImageURL = jsonObject.getString("org_img_url");
        		enhancedImageURL = jsonObject.getString("nhcd_img_url");
        		
        		obj.put("_attmpt", 1);
        		obj.put("org_img_url", originalImageURL);
        		
        		boolean isEnhanced = jsonObject.getBoolean("isEnhcnd");
        		if(isEnhanced){
        			obj.put("nhcd_img_url", enhancedImageURL);
        		}else {
        			obj.put("nhcd_img_url", originalImageURL);
        		}
        		
        		log.info("Enhancement Flag for the Current Document::: " + isEnhanced);
        	}else {
        		log.info("Enhancement API failed with code: " + jsonObject.getString("status") + " and Message: " + jsonObject.getString("status_msg"));
        	}
        }
    	*/
        obj.put("_attmpt", 1);
        obj.put("_img", encoded);
        obj.put("_filename", filename);
        
        RequestBody body = RequestBody.create(JSON, obj.toString());
		log.info("RequestBody::: "+body);
        Request request = new Request.Builder().url(ConfigReader.getResourceBundle().getProperty("Post_Service_URL")).post(body).build();
        
        if(isMask) {
        	long startTime = System.currentTimeMillis();
            try (Response response = client.newCall(request).execute()) {
            	long endTime = System.currentTimeMillis();
    	        long processTimeMillis = endTime - startTime;
    	        long processTimeSeconds = processTimeMillis / 1000;
    	        long minutes = processTimeSeconds / 60;
    	        attempt = "1";
    	        log.info("ATTEMPT: " + obj.getInt("_attmpt"));
    	        log.info("Masking API Response Time::: " + processTimeMillis + " MILLISECONDS, " + processTimeSeconds + " SECONDS, " + minutes % 60 + " MINUTES.");
    		   	
    	        log.info("::: Document Processed for Masking Attempt-1 :::");
            	if (!response.isSuccessful()) throw new IOException("Unexpected code while calling Masking API ==> " + response);
            	
            	apiResponse = response.body().string();
            	JSONObject jsonObject = new JSONObject(apiResponse);
            	
            	if(jsonObject.getString("status") != null && jsonObject.getString("status").equals("200")) {
            		manualMask = jsonObject.getBoolean("reprocess");
            		qcRequired = jsonObject.getBoolean("qcRequired");
            		processCount = "1";
                	log.info("Manual Masking Flag for the Current Document::: " +manualMask.toString());
            	}else {
            		log.info("Masking API failed with code: " + jsonObject.getString("status") + " and Message: " + jsonObject.getString("status_msg"));
            	}
            }
        }
    	
        
        if(manualMask) {
        	obj.put("_attmpt", 2);
        	body = RequestBody.create(JSON, obj.toString());
    		log.info("RequestBody::: "+body);
            request = new Request.Builder().url(ConfigReader.getResourceBundle().getProperty("Post_Service_URL")).post(body).build();
        	long startTime2 = System.currentTimeMillis();
    		try (Response retryResponse = client.newCall(request).execute()) {
    	        long endTime2 = System.currentTimeMillis();
    	        long processTimeMillis2 = endTime2 - startTime2;
    	        long processTimeSeconds2 = processTimeMillis2 / 1000;
    	        long minutes2 = processTimeSeconds2 / 60;
    	        attempt = "2";
    	        log.info("ATTEMPT: " + obj.getInt("_attmpt"));
    		   	log.info("Masking API (Attempt-2) Response Time::: " + processTimeMillis2 + " MILLISECONDS, " + processTimeSeconds2 + " SECONDS, " + minutes2 % 60 + " MINUTES.");
    	   		
    			log.info("::: Document Reprocessed for Masking in Attempt-2 :::");
    			if (!retryResponse.isSuccessful()) throw new IOException("Unexpected code while calling Masking API in Attempt-2 " + retryResponse);
    			
    			String retryApiResponse = retryResponse.body().string();
    			JSONObject jsonObject = new JSONObject(retryApiResponse);
    			
    			if(jsonObject.getString("status") != null && jsonObject.getString("status").equals("200")) {
    				manualMask = jsonObject.getBoolean("reprocess");
    				qcRequired = jsonObject.getBoolean("qcRequired");
    				processCount = "2";
    				apiResponse = retryApiResponse;
    				log.info("::: Retry Masking API successful in Attempt-2 :::");
    			}else {
    				log.info("Retry Masking API (Attempt-2) failed with code: " + jsonObject.getString("status") + " and Message: " + jsonObject.getString("status_msg"));
    			}
    		}
    	}
//        if(manualMask) {
//        	obj.put("_attmpt", 3);
//        	body = RequestBody.create(JSON, obj.toString());
//    		log.info("RequestBody::: "+body);
//            request = new Request.Builder().url(ConfigReader.getResourceBundle().getProperty("Post_Service_URL")).post(body).build();
//        	long startTime3 = System.currentTimeMillis();
//        	try (Response finalAttempt = client.newCall(request).execute()) {
//        		long endTime3 = System.currentTimeMillis();
//    	        long processTimeMillis3 = endTime3 - startTime3;
//    	        long processTimeSeconds3 = processTimeMillis3 / 1000;
//    	        long minutes3 = processTimeSeconds3 / 60;
//    	        log.info("ATTEMPT: " + obj.getInt("_attmpt"));
//    		   	log.info("Masking API (Attempt-3) Response Time::: " + processTimeMillis3 + " MILLISECONDS, " + processTimeSeconds3 + " SECONDS, " + minutes3 % 60 + " MINUTES.");
//    	   		
//    			log.info("::: Document Reprocessed for Masking in Attempt-3 :::");
//    			if (!finalAttempt.isSuccessful()) throw new IOException("Unexpected code while calling Masking API in Attempt-3 " + finalAttempt);
//    			
//    			String finalApiResponse = finalAttempt.body().string();
//    			JSONObject jsonObject = new JSONObject(finalApiResponse);
//    			
//    			if(jsonObject.getString("status_code") != null && jsonObject.getString("status_code").equals("200")) {
//    				log.info("manual_masking value in the Final attempt: " + jsonObject.getBoolean("manual_masking"));
//    				processCount = "3";
//    				apiResponse = finalApiResponse;
//    				log.info("::: Retry Masking API successful in Attempt-3 :::");
//    			}else {
//    				log.info("Retry Masking API (Attempt-3) failed with code: " + jsonObject.getString("status_code") + " and Message: " + jsonObject.getString("status_msg"));
//    			}
//        	}
//        }
        JSONObject response = new JSONObject();
        response.put("apiResponse", apiResponse);
        response.put("processCount", processCount);
        response.put("isPoorDPI", isPoorDPI);
        response.put("isBright", isBright);
        response.put("attempt", attempt);
        response.put("dpi", dpi);
        response.put("minBrightness", minBrightness);
        response.put("maxBrightness", maxBrightness);
        response.put("recommendation", recommendation);
        response.put("qcRequired", qcRequired);
        
        return response;
	}
    
    public static void main(String[] args) {
    	Masking am = new Masking();
    	
    	try {
    		
    		JSONObject apiResp = am.maskDocument("12", "am");
    		if(apiResp != null) {
    			JSONObject jsonObject = new JSONObject(apiResp);
    			log.info("Output of jsonObject::: " + jsonObject);
    			String decoded = jsonObject.getString("mskd_img");
    			log.info("Output Image::: " + decoded);
    			
    			byte[] decoded1 = Base64.getDecoder().decode(jsonObject.getString("mskd_img").getBytes("UTF-8"));
    			ByteArrayInputStream output = new ByteArrayInputStream(decoded1);
    			log.info("Output Bytestream::: " + output);
    			
    		}
    		
    	} catch (Exception e) {
			e.printStackTrace();
		}
    }
}
