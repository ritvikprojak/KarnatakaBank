require(["dojo/aspect", "ecm/model/Desktop" , "dojo/_base/lang" ], function(aspect, Desktop , lang){


	var desktop = Desktop;

	aspect.after(desktop, "onLogin", lang.hitch(this, function(){
		console.log("ScriptPlugin debug start");

		require(["Karnatakascript/AddIPScripts" , "Karnatakascript/Inbasket","Karnatakascript/SearchScripts",
			"Karnatakascript/AddTaskScript", "Karnatakascript/CaseDashboard",
			"Karnatakascript/ExportToCSV", "Karnatakascript/Step_Comment",
			"Karnatakascript/Step_ResponseValidation", "Karnatakascript/FieldUpdate_16112021",
			"Karnatakascript/BeforeLoadWidgetScriptsRolewise","Karnatakascript/CaseValidationDetails"], function(addcasescript , ccinbasket,icmscripts,
					addtaskscript, dashboardscript, csvexport,
					cccommentaction, ccresponseaction, propupdateaction, beforeloadaction,cccasevalidation) {
			console.log("ScriptPlugin: end to require files - start");

			console.log("ScriptPlugin: end to require files - end");
		});
		console.log("ScriptPlugin debug end");
	}));
	aspect.after(ecm.widget.ItemPropertiesPane.prototype, "onCompleteRendering", function() {
		debugger;
		console.info("onCompleteRendering");
		var roleName = ecm.model.desktop.currentRole.name;
		/*if((roleName=="Branch Maker" || roleName == "Assigner")){
			var fields = this._commonProperties.attributeDefinitions;
			for(var i=0;i<fields.length;i++){
				if(fields[i].id == "LJ_LVBDstatus"){
					this._commonProperties.setPropertyPropertyValue("LJ_LVBDstatus","readOnly",true);
					break;
				}
			}
		}else*/ if(roleName != "Loan Processing Officer"){
			
			if(this._commonProperties.setPropertyPropertyValue == undefined){
				var props = this._commonProperties._propertyEditors._fields;
				for(var j=0;j<props.length;j++){//this._commonProperties.setPropertyPropertyValue == undefined;
					if(props[j].name == "LJ_LVBDstatus"){
						this._commonProperties._propertyEditors._fields[j].readOnly = true;
						break;
					}
				}
			}else{
				var fields = this._commonProperties.attributeDefinitions;
				for(var i=0;i<fields.length;i++){
					if(fields[i].id == "LJ_LVBDstatus"){
						this._commonProperties.setPropertyPropertyValue("LJ_LVBDstatus","readOnly",true);
						break;
					}
				}
			}
			/*var props = this._commonProperties._propertyEditors._fields;
			for(var j=0;j<props.length;j++){//this._commonProperties.setPropertyPropertyValue == undefined;
				if(props[j].name == "LJ_LVBDstatus"){
					this._commonProperties._propertyEditors._fields[j].readOnly = true;
					break;
				}
			}*/
		}else{
			console.log("Not handled.")
		}
		
		
		
		
	},true);
});

