package com.projak.icm.ldap;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.projak.icm.controller.LdapController;
import com.projak.icm.utility.PropertyReader;

public class LdapClient {
	
	private static final Logger logger = LoggerFactory.getLogger(LdapClient.class);

	static LdapContext ctx = null;

	static final String commonDN = PropertyReader.getProperty("commonDN");

	static final String userObjectClass = PropertyReader.getProperty("userObjectClass");

	static final String userSearchAttribute = PropertyReader.getProperty("userSearchAttribute");

	public static LdapContext getContext() {

		try {

			Hashtable<String, String> env = new Hashtable<String, String>();

			env.put(Context.PROVIDER_URL, PropertyReader.getProperty("url"));
			env.put(Context.SECURITY_PRINCIPAL, PropertyReader.getProperty("userId"));
			env.put(Context.SECURITY_CREDENTIALS, PropertyReader.getProperty("password"));
			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.SECURITY_AUTHENTICATION, "Simple");

			ctx = new InitialLdapContext(env, null);

		} catch (Exception ex) {
			logger.error("Error in ldap Context: " + ex.fillInStackTrace());
			ex.printStackTrace();
		}
		return ctx;

	}

	public String getAttribute(String attribute, String userName) {
		String value = null;
		try {

			NamingEnumeration<SearchResult> nE = LdapClient.getContext().search(commonDN,
					"(&" + userObjectClass + "(" + userSearchAttribute + "=" + userName + "))",
					SearchQueries.GetAttributes(attribute));
			if (nE.hasMore()) {
				Attributes attrs = nE.next().getAttributes();
				System.out.println("Attribute Value : "+attrs.get(attribute).get(0));
				value = (String) attrs.get(attribute).get(0);
			}
		} catch (NamingException e) {
			e.printStackTrace();
		}

		return value;
	}

}
