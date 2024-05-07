package com.projak.karnatak.migration.utility;

import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class PropertyReader {
	
	private final static Logger logger = Logger.getLogger(PropertyReader.class);

	private Properties properties = null;

	private static final PropertyReader Instance;

	private PropertyReader() {

		try {

			properties = new Properties();
			InputStream ios = PropertyReader.class.getResourceAsStream("/application.properties");
			properties.load(ios);

		} catch (Exception ex) {
			logger.debug("Error :",ex);
			logger.error(ex.fillInStackTrace());
		}

	}

	public static String getProperty(final String key) {
		return getInstance().properties.getProperty(key);
	}

	public static PropertyReader getInstance() {
		return PropertyReader.Instance;
	}

	static {
		Instance = new PropertyReader();
	}

}
