package com.projak.icm.service;

public interface KbankService {
	
	String getLARDetails(String LAR);
	
	String getUserDetails(String userId);
	
	String getClassPower(String userId);

	String getUserRODetails(String userId);

}
