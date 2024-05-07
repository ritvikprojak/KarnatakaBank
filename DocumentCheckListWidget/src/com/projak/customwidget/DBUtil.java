package com.projak.customwidget;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class DBUtil {

	private static Connection dbConnection = null;
	Properties prop = null;

	private Connection getDBConnection(String url, String dbuser, String password) throws Exception {
		System.out.println("inside connection");

		if (dbConnection == null || dbConnection.isClosed()) {

			Class.forName(prop.getProperty("DATABASE_DRIVER"));

			dbConnection = DriverManager.getConnection(url, dbuser, password);
			System.out.println("DbConnection status" + dbConnection.isClosed());
		}

		return dbConnection;
	}

	private Connection getConfigDBConnection() throws Exception {

		System.out.println("inside connection" + prop.getProperty("CONFIG_DB_URL"));

		return getDBConnection(prop.getProperty("CONFIG_DB_URL"), prop.getProperty("CONFIG_DB_USERNAME"),
				prop.getProperty("CONFIG_DB_PASSWORD"));
	}

	public JSONArray getDocCheckList(String productId) {

		prop = getProperties();

		Statement stmt = null;
		ResultSet rst = null;

		String sqlQuery = prop.getProperty("CONFIG_DB_SQL");
		System.out.println("prop file sqlsqlQuery" + sqlQuery);

		sqlQuery = sqlQuery.replace("[PRODUCT_ID]", productId);
		System.out.println("prop file finalquery" + sqlQuery);

		// "SELECT * FROM MIGRATE.DOC_CHECKLIST_CONFIG WHERE
		// PRODUCT_ID='"+productId+"' AND ENABLE='YES'";
		JSONArray checklistArray = new JSONArray();

		System.out.println("Final Query" + sqlQuery);

		try {

			getConfigDBConnection();
			stmt = dbConnection.createStatement();
			rst = stmt.executeQuery(sqlQuery);
			while (rst.next()) {
				JSONObject checklist = new JSONObject();
				checklist.put("KYC_Documents", rst.getString("DOCUMENT_TYPE"));
				checklist.put("Documents_desc", rst.getString("DOCUMENT_DESC"));
				checklist.put("REQUIRED", rst.getString("REQUIRED"));
				checklist.put("DOC_CODE", rst.getString("DOC_CODE"));

				checklistArray.add(checklist);
			}

		} catch (SQLException e) {
			System.out.println("Error Occured in While  Connecting database" + e.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error Occured in While  excuting the query" + e.toString());

		} finally {

			if (stmt != null)
				stmt = null;
			if (dbConnection != null)
				try {
					dbConnection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

		}
		return checklistArray;
	}

	public Properties getProperties() {

		Properties properties = new Properties();

		File file = new File("/opt/IBM/DocCheckListDB.properties");
		//File file = new File("C:\\IBM PROJAK\\DocumentCheckListWidget\\DocCheckListDB.properties");

		System.out.println("file111" + file.getName());

		FileInputStream fileInput = null;

		try {

			fileInput = new FileInputStream(file);

			System.out.println("file222" + file.getName());
			properties.load(fileInput);

		} catch (IOException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

		return properties;

	}
}