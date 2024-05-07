package com.projak.icm.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

import org.apache.http.auth.AuthenticationException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import com.projak.icm.service.KbankService;
import com.projak.icm.utility.PropertyReader;

@Service
public class KbankServiceImpl implements KbankService {

	private static final Logger logger = LoggerFactory.getLogger(KbankServiceImpl.class);

	@Override
	public String getLARDetails(String LAR) {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {

			HttpPost httpPost = new HttpPost(PropertyReader.getProperty("laps.lar.url"));
			httpPost.setHeader("Content-type", "application/json");
			String encodedPassword = PropertyReader.getProperty("laps.authentication");
			httpPost.addHeader("Authorization", "Basic " + encodedPassword);
			logger.info("Basic Authentication Successful for getLar Service for LAR number :" + LAR);
			JSONObject jobj = new JSONObject();
			jobj.put("larNumber", LAR);
			logger.info("Request Body : " + jobj.toString());
			StringEntity entity = null;

			try {

				entity = new StringEntity(jobj.toString());

			} catch (UnsupportedEncodingException e) {

				logger.error(e.getLocalizedMessage(), e.fillInStackTrace());
				e.printStackTrace();

			}

			httpPost.setEntity(entity);
			logger.info("Executing request " + httpPost.getRequestLine());
			CloseableHttpResponse responseBody;
			StringBuilder responseStrBuilder = new StringBuilder();

			try {

				responseBody = httpClient.execute(httpPost);
				InputStream ios = responseBody.getEntity().getContent();
				BufferedReader bR = new BufferedReader(new InputStreamReader(ios));
				String line = "";

				while ((line = bR.readLine()) != null) {

					responseStrBuilder.append(line);

				}

				ios.close();

				httpClient.close();

				logger.info("Http Request Executed with status code : " + responseBody.getStatusLine().getStatusCode());

				return responseStrBuilder.toString();

			} catch (IOException e) {

				logger.error(e.getLocalizedMessage(), e.fillInStackTrace());
				e.printStackTrace();

			}

			return responseStrBuilder.toString();

		} catch (Exception ex) {

			logger.error(ex.getLocalizedMessage(), ex.fillInStackTrace());
			ex.printStackTrace();

			return "{}";

		}

	}

	@Override
	public String getUserDetails(String userId) {

		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {

			HttpPost httpPost = new HttpPost(PropertyReader.getProperty("laps.users.url"));
			httpPost.setHeader("Content-type", "application/json");
			String encodedPassword = PropertyReader.getProperty("laps.authentication");
			httpPost.addHeader("Authorization", "Basic " + encodedPassword);
			logger.info("Basic Authentication Successful for getLar Service for LAR number :" + userId);
			JSONObject jobj = new JSONObject();
			jobj.put("userID", userId);
			logger.info("Request Body : " + jobj.toString());
			StringEntity entity = null;

			try {

				entity = new StringEntity(jobj.toString());

			} catch (UnsupportedEncodingException e) {
				logger.error(e.getLocalizedMessage(), e.fillInStackTrace());
				e.printStackTrace();

			}

			httpPost.setEntity(entity);
			logger.info("Executing request " + httpPost.getRequestLine());
			CloseableHttpResponse responseBody;
			StringBuilder responseStrBuilder = new StringBuilder();

			try {

				responseBody = httpClient.execute(httpPost);
				logger.info("Http Request Executed with status code : " + responseBody.getStatusLine().getStatusCode());
				InputStream ios = responseBody.getEntity().getContent();
				BufferedReader bR = new BufferedReader(new InputStreamReader(ios));
				String line = "";

				while ((line = bR.readLine()) != null) {

					responseStrBuilder.append(line);

				}

				ios.close();

				httpClient.close();

				logger.info("Http Request Executed with status code : " + responseBody.getStatusLine().getStatusCode());

				return responseStrBuilder.toString();

			} catch (IOException e) {

				logger.error(e.getLocalizedMessage(), e.fillInStackTrace());
				e.printStackTrace();

			}

			return responseStrBuilder.toString();

		} catch (Exception ex) {

			logger.error(ex.getLocalizedMessage(), ex.fillInStackTrace());
			ex.printStackTrace();

			return "{}";

		}

	}

	@Override
	public String getClassPower(String userId) {

		String userDetails = getUserDetails(userId);

		JSONObject jobj = new JSONObject(userDetails);

		JSONObject dataJSON = null;

		try {

			dataJSON = (JSONObject) jobj.get("data");

		} catch (JSONException jEx) {

			logger.error("Data is not present for the userId : " + userId);

			if (logger.isDebugEnabled()) {

				logger.debug(jEx.getLocalizedMessage(), jEx.fillInStackTrace());

			}

			return null;

		}

		return null;
	}

	@Override
	public String getUserRODetails(String userId) {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {

			HttpPost httpPost = new HttpPost(PropertyReader.getProperty("laps.rousers.url"));
			httpPost.setHeader("Content-type", "application/json");
			String encodedPassword = PropertyReader.getProperty("laps.authentication");
			httpPost.addHeader("Authorization", "Basic " + encodedPassword);
			logger.info("Basic Authentication Successful for getLar Service for LAR number :" + userId);
			JSONObject jobj = new JSONObject();
			jobj.put("userID", userId);
			logger.info("Request Body : " + jobj.toString());
			StringEntity entity = null;

			try {

				entity = new StringEntity(jobj.toString());

			} catch (UnsupportedEncodingException e) {
				logger.error(e.getLocalizedMessage(), e.fillInStackTrace());
				e.printStackTrace();

			}

			httpPost.setEntity(entity);
			logger.info("Executing request " + httpPost.getRequestLine());
			CloseableHttpResponse responseBody;
			StringBuilder responseStrBuilder = new StringBuilder();

			try {

				responseBody = httpClient.execute(httpPost);
				logger.info("Http Request Executed with status code : " + responseBody.getStatusLine().getStatusCode());
				InputStream ios = responseBody.getEntity().getContent();
				BufferedReader bR = new BufferedReader(new InputStreamReader(ios));
				String line = "";

				while ((line = bR.readLine()) != null) {

					responseStrBuilder.append(line);

				}

				ios.close();

				httpClient.close();

				logger.info("Http Request Executed with status code : " + responseBody.getStatusLine().getStatusCode());

				return responseStrBuilder.toString();

			} catch (IOException e) {

				logger.error(e.getLocalizedMessage(), e.fillInStackTrace());
				e.printStackTrace();

			}

			return responseStrBuilder.toString();

		} catch (Exception ex) {

			logger.error(ex.getLocalizedMessage(), ex.fillInStackTrace());
			ex.printStackTrace();

			return "{}";

		}
	}

}
