package icm.sb;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;

public class KarnatakaScriptPlugin extends Plugin {

	@Override
	public String getId() {
		return "KarnatakaScriptPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return  "KarnatakaScriptPlugin";
	}

	@Override
	public String getVersion() {
		return "0.3";
	}


	// @Override
	 public String getDojoModule() {
		 return "Karnatakascript";
	 }

	@Override
	public String getScript() {
		return "KarnatakaScriptPlugin.js";
	}

}
