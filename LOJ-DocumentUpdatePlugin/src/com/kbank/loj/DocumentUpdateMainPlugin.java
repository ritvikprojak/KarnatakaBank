package com.kbank.loj;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginService;

public class DocumentUpdateMainPlugin extends Plugin{

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "DocUpdateMainPluginId";
	}

	@Override
	public String getName(Locale arg0) {
		// TODO Auto-generated method stub
		return "DocumentUpdateMainPlugin";
	}

	@Override
	public String getVersion() {
		// TODO Auto-generated method stub
		return "2.10";
	}
	@Override
	public String getScript() {
		// TODO Auto-generated method stub
		return "CustomWidgetFormScript.js";
	}
	@Override
	public PluginService[] getServices() {
		// TODO Auto-generated method stub
		return  new PluginService[]{new UpdateDatabaseService(),new DocumentCheckListMailService()};
		
	}

}
