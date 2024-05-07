package com.kbank.loj;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.ibm.json.java.JSONArray;

public class DocStatusDBUtil {

	private static Connection dbConnection = null;
	Properties prop = null;

	private Connection getDBConnection(String url, String dbuser, String password) throws Exception {
		System.out.println("inside connection");
		try {
			if (dbConnection == null || dbConnection.isClosed()) {

				Class.forName("oracle.jdbc.driver.OracleDriver");

				dbConnection = DriverManager.getConnection(url, dbuser, password);

				System.out.println("after DbConnection status" + dbConnection.isClosed());
			}
		} catch (Exception e) {
			System.out.println("exception inside config db");
			e.printStackTrace();
			getDBConnection();
		}
		return dbConnection;
	}

	private Connection getConfigDBConnection() throws Exception {

		System.out.println(prop.getProperty("CM_CONFIG_DB_PASSWORD") + "" + prop.getProperty("CM_CONFIG_DB_USERNAME")
				+ "inside connection" + prop.getProperty("CM_CONFIG_DB_URL"));

		return getDBConnection(prop.getProperty("CM_CONFIG_DB_URL"), prop.getProperty("CM_CONFIG_DB_USERNAME"),
				prop.getProperty("CM_CONFIG_DB_PASSWORD"));
	}

	public JSONArray updateCaseStatus(String caseStaus, String docStatus, String larNumber) {

		prop = getProperties();

		// getDBConnection();

		Statement stmt = null;

		String sqlQuery = prop.getProperty("UpdateDBQuery");

		sqlQuery = sqlQuery.replace("[CASESTATUS]", caseStaus);
		sqlQuery = sqlQuery.replace("[INWARD_NO]", larNumber);
		sqlQuery = sqlQuery.replace("[DOC_STATUS]", docStatus);

		JSONArray checklistArray = new JSONArray();
		System.out.println("Final Query" + sqlQuery);

		try {
			// getDBConnection();
			getConfigDBConnection();

			stmt = dbConnection.createStatement();
			int status = stmt.executeUpdate(sqlQuery);

			System.out.println("status: " + status + "sucessfully updated lar " + larNumber);

		} catch (SQLException e) {
			e.printStackTrace();

			System.out.println("Error Occured  with sql connection" + e.toString());

			// getDBConnection();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error Occured in While  excuting the query" + e.toString());

		} finally {

			if (stmt != null)
				try {
					stmt.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
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

	public JSONArray updateCaseCurrentStatus(String caseStaus, String larNumber) {

		prop = getProperties();

		Statement stmt = null;

		String sqlQuery = prop.getProperty("UpdateCaseStatusQuery");

		sqlQuery = sqlQuery.replace("[CASECURRENTSTATUS]", caseStaus);
		sqlQuery = sqlQuery.replace("[INWARD_NO]", larNumber);

		JSONArray checklistArray = new JSONArray();
		System.out.println("Final Query" + sqlQuery);

		try {
			// getDBConnection();
			getConfigDBConnection();

			stmt = dbConnection.createStatement();
			int status = stmt.executeUpdate(sqlQuery);

			System.out.println("status: " + status + "sucessfully updated lar " + larNumber);

		} catch (SQLException e) {
			e.printStackTrace();

			System.out.println("Error Occured  with sql connection" + e.toString());

			// getDBConnection();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error Occured in While  excuting the query" + e.toString());

		} finally {

			if (stmt != null)
				try {
					stmt.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
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

	public JSONArray updatecheckerSubmitedTime(String submittedTime, String larNumber) {

		prop = getProperties();
		JSONArray checklistArray = new JSONArray();
		Statement stmt = null;

		String sqlQuery = prop.getProperty("CheckerSubmitQuery");

		sqlQuery = sqlQuery.replace("[CSUBMITTIME]", submittedTime);
		sqlQuery = sqlQuery.replace("[INWARD_NO]", larNumber);

		System.out.println("Final Query" + sqlQuery);

		// getDBConnection();
		try {
			getConfigDBConnection();

			stmt = dbConnection.createStatement();
			int status = stmt.executeUpdate(sqlQuery);

			System.out.println("status: " + status + "sucessfully updated lar " + larNumber);

		} catch (SQLException e) {
			e.printStackTrace();

			System.out.println("Error Occured  with sql connection" + e.toString());

			// getDBConnection();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error Occured in While  excuting the query" + e.toString());

		} finally {

			if (stmt != null)
				try {
					stmt.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
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

	public JSONArray updatecReturentdTime(String dateType, String ReturntedTime, String larNumber) {

		prop = getProperties();

		Statement stmt = null;
		Statement trackUpdate = null;

		String sqlQuery = prop.getProperty("ReturnTimeQuery");
		String updateTrackdata = prop.getProperty("UpdateTrackTimeQuery");

		sqlQuery = sqlQuery.replace("[RETTIME]", ReturntedTime);
		sqlQuery = sqlQuery.replace("[INWARD_NO]", larNumber);

		updateTrackdata = updateTrackdata.replace("[TRACKTIME]", "~" + dateType + "-" + ReturntedTime);
		updateTrackdata = updateTrackdata.replace("[INWARD_NO]", larNumber);

		JSONArray checklistArray = new JSONArray();
		System.out.println("Final Query" + sqlQuery);
		System.out.println("Final Query" + updateTrackdata);

		try {
			// getDBConnection();
			getConfigDBConnection();

			stmt = dbConnection.createStatement();
			trackUpdate = dbConnection.createStatement();

			int status = stmt.executeUpdate(sqlQuery);
			int trackstatus = trackUpdate.executeUpdate(updateTrackdata);

			System.out.println("status: " + status + "sucessfully updated lar " + larNumber);
			System.out.println("status: " + trackstatus + "sucessfully updated lar " + larNumber);

		} catch (SQLException e) {
			e.printStackTrace();

			System.out.println("Error Occured  with sql connection" + e.toString());

			// getDBConnection();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("Error Occured in While  excuting the query" + e.toString());

		} finally {

			if (stmt != null)
				try {
					stmt.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
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

	public Connection getDBConnection() {
		Connection conn = null;
		DataSource ds = null;
		System.out.println("inside datasource");

		try {
			Context initContext = new InitialContext();
			ds = (DataSource) initContext.lookup("LAPSDB");

			dbConnection = ds.getConnection();
			System.out.println("datasource connection is closed" + dbConnection.isClosed());

		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Error occured with datasource" + e.toString());

		}
		return conn;
	}

	public String convertStringToDate(String startDate) {
		java.sql.Date sqlStartDate = null;
		String strDate = null;
		SimpleDateFormat sdf1 = new SimpleDateFormat("MM-dd-yyyy");
		java.util.Date date;
		try {
			if (startDate != null) {
				date = sdf1.parse(startDate);
				strDate = sdf1.format(date);
				sqlStartDate = new java.sql.Date(date.getTime());
			} else {
				return null;
			}

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return strDate;
	}

	public Properties getProperties() {

		Properties properties = new Properties();

		File file = new File("/icn/IBM/LOJPlugin/DocCheckListDB.properties");

		System.out.println("file111" + file.getName());

		FileInputStream fileInput = null;

		try {

			fileInput = new FileInputStream(file);

			properties.load(fileInput);

		} catch (IOException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

		return properties;

	}
}