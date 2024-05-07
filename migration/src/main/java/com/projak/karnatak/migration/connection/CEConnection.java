package com.projak.karnatak.migration.connection;

import java.net.Socket;
import java.security.cert.CertificateException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509ExtendedTrustManager;
import javax.security.auth.Subject;

import com.filenet.api.core.Connection;
import com.filenet.api.core.Domain;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.UserContext;
import com.projak.karnatak.migration.utility.PropertyReader;

public class CEConnection {
	
	private Domain dom;
	private ObjectStore os;
	public Subject sub;

	public CEConnection() {

	}

	public Domain getDomain() {
		return dom;
	}

	public void setDomain(Domain domain) {
		this.dom = domain;
	}

	public ObjectStore getOs() {
		return os;
	}

	public void setOs(ObjectStore os) {
		this.os = os;
	}

	public void setSubject(Subject sub) {
		this.sub = sub;
	}

	public Subject getSubject() {
		return sub;
	}

	public void establishConnection(String userName, String password) {
		trustAllHosts();
		String uri = PropertyReader.getProperty("filenet.url");
		String stanza = PropertyReader.getProperty("filenet.stanza");
		Connection con = Factory.Connection.getConnection(uri);
		Subject sub = UserContext.createSubject(con, userName, password, stanza);
		UserContext uc = UserContext.get();
		setSubject(sub);
		uc.pushSubject(sub);
		Domain dom = Factory.Domain.fetchInstance(con, null, null);
		setDomain(dom);
		String OS = PropertyReader.getProperty("OS");
		ObjectStore os = Factory.ObjectStore.fetchInstance(dom, OS, null);
		setOs(os);
	}

	public static void trustAllHosts() {
		try {
			TrustManager[] trustAllCerts = new TrustManager[] { new X509ExtendedTrustManager() {
				public java.security.cert.X509Certificate[] getAcceptedIssuers() {
					return null;
				}

				public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {
				}

				public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {
				}

				@Override
				public void checkClientTrusted(java.security.cert.X509Certificate[] xcs, String string, Socket socket)
						throws CertificateException {

				}

				@Override
				public void checkServerTrusted(java.security.cert.X509Certificate[] xcs, String string, Socket socket)
						throws CertificateException {

				}

				@Override
				public void checkClientTrusted(java.security.cert.X509Certificate[] xcs, String string, SSLEngine ssle)
						throws CertificateException {

				}

				@Override
				public void checkServerTrusted(java.security.cert.X509Certificate[] xcs, String string, SSLEngine ssle)
						throws CertificateException {

				}

			} };

			// Create all-trusting host name verifier
			HostnameVerifier allHostsValid = new HostnameVerifier() {
				public boolean verify(String hostname, SSLSession session) {
					return true;
				}

				@SuppressWarnings("unused")
				public boolean verify1(String arg0, SSLSession arg1) {
					return false;
				}
			};
			// Install the all-trusting host verifier
			HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);

			SSLContext sc = SSLContext.getInstance("SSL");
			sc.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
		} catch (Exception e) {

		}
	}
}
