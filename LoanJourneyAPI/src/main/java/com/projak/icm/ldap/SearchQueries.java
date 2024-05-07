package com.projak.icm.ldap;

import javax.naming.directory.SearchControls;

public class SearchQueries {

	static SearchControls GetAttributes(String attribute) {
		SearchControls cons = new SearchControls();
		cons.setSearchScope(SearchControls.SUBTREE_SCOPE);
		String[] attrIDs = { attribute };
		cons.setReturningAttributes(attrIDs);
		return cons;
    }
	
}
