package com.projak.customwidget;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginService;

public class CustomWidgetFormMainPlugin extends Plugin{

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "CustomWidgetFormMainPluginId";
	}

	@Override
	public String getName(Locale arg0) {
		// TODO Auto-generated method stub
		return "CustomWidgetFormMainPluginName";
	}

	@Override
	public String getVersion() {
		// TODO Auto-generated method stub
		return "3.0";
	}
	@Override
	public String getScript() {
		// TODO Auto-generated method stub
		return "CustomWidgetFormScript.js";
	}
	@Override
	public PluginService[] getServices() {
		// TODO Auto-generated method stub
		return  new PluginService[]{new AddDocumentServicePlugin(),new DocumentCheckListService(),new DocumentCheckListMailService()};
		
	}

}
