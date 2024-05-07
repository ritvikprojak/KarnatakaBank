package com.projak.ktkbank.event.action;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.filenet.api.core.Folder;
import com.filenet.api.engine.EventActionHandler;
import com.filenet.api.events.ObjectChangeEvent;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.util.Id;
import com.projak.ktkbank.event.action.query.QueryStatement;

public class CreationUpdateEventAction implements EventActionHandler {

	public void onEvent(ObjectChangeEvent arg0, Id arg1)

	throws EngineRuntimeException {

		System.out.println("CreationUpdateEventAction.onEvent() called");

		InitialContext context = null;

		Connection conn = null;

		try {

			Folder fold = (Folder) arg0.get_SourceObject();

			fold.refresh();

			System.out.println("Case Folder Fetched");

			String larNumber = null;

			String caseIdentifier = null;

			try {

				larNumber = fold.getProperties().getStringValue("LJ_LARNumber");

				caseIdentifier = fold.getProperties().getStringValue(

				"CmAcmCaseIdentifier");

			} catch (Exception ex) {

				System.out.println("LAR Number not present.");

				System.out.println(ex.getLocalizedMessage());

				System.err.println(ex);

			}

			if (larNumber != null && caseIdentifier != null) {

				try {

					context = new InitialContext();

					System.out.println("Initial Context Created");

					Class.forName("oracle.jdbc.driver.OracleDriver");

					conn = DriverManager.getConnection(

					"jdbc:oracle:thin:@172.20.111.230:1521:orcllaps", "dmsusr", "dmsusr123");

					System.out.println("Connection successfull");
					
					conn.setAutoCommit(false);
					
					System.out.println("Auto Commit Set to false");

					String sql = QueryStatement.updateQuery;

					PreparedStatement stmt = conn.prepareStatement(sql);

					stmt.setString(1, caseIdentifier);

					stmt.setDate(2, Date.valueOf(LocalDate.now()));

					stmt.setString(3, larNumber);

					stmt.executeUpdate();

					conn.commit();

					System.out.println("Changes Committed to LAPS System");

				} catch (NamingException e) {

					// TODO Auto-generated catch block

					e.printStackTrace();

				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {

					if (conn != null) {
						conn.close();
					}

				}

			}

		} catch (SQLException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

	}

	public static void main(String args[]) {

		try {

			Class.forName("oracle.jdbc.driver.OracleDriver");

			Connection conn = DriverManager.getConnection(

			"jdbc:oracle:thin:@localhost:1521:orcl", "oia", "oia");

			System.out.println("Connection successfull");

			String sql = QueryStatement.updateQuery;

			System.out.println(sql);

			PreparedStatement stmt = conn.prepareStatement(sql);

			stmt.setString(1, "Demo");

			stmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));

			stmt.setString(3, "1234567890");

			System.out.println(stmt);

			stmt.executeUpdate();

			System.out.println("Executed");

		} catch (ClassNotFoundException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		} catch (SQLException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

	}

}
