package com.projak.icm.service.impl;

import com.projak.icm.service.LdapService;
import com.projak.icm.utility.PropertyReader;

import org.springframework.stereotype.Service;

import com.projak.icm.ldap.LdapClient;


@Service
public class LdapServiceImpl implements LdapService {

	@Override
	public String getSolId(String userId) {
		LdapClient client = new LdapClient();
		String value = client.getAttribute(PropertyReader.getProperty("solId"), userId);
		return value;
	}

}
