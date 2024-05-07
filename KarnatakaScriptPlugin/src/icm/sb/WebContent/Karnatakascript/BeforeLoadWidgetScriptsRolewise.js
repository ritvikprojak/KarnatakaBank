require(["dojo/_base/lang",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, Action,Constants, ControllerManager){
    lang.setObject("beforeloadaction", {
        "passthrough": function(theController,payload, solution, role, scriptAdaptor){
            return payload;
        },
		
        beforeloadactionPO: function(theController,payload,solution,role,scriptAdaptor){
        	  var responseself = scriptAdaptor;
        	var step=responseself.editable.icmWorkItem.stepName;
        	
        	if(step === "PO Creation Step")
        		{
        		
        		  setCaseProperty(theController,"","IPS_StandardPONumber","required",true);
        		}else{
        			setCaseProperty(theController,"","IPS_StandardPONumber","required",false);
        		}
        	
        	
        	
        	
        	
        	
        },

		beforeloadactionBC:function(theController,payload, solution, role, scriptAdaptor){
			console.log("inside before load");
			//if(step === "Branch Checker"){
				//console.log("inside if before load");
				//setCaseProperty(theController,"","LJ_Department","required",true);
				//setCaseProperty(theController,"","LJ_Assigner","required",true);
			//}
		},
	
        beforeloadactionAO: function(theController,payload, solution, role, scriptAdaptor){
        
        var user = ecm.model.desktop.userId;
        var userId = user.toUpperCase();
        setCaseProperty(theController,"","LJ_AssignedBy","value",userId);	
        setCaseProperty(theController,"","LJ_ProcessingOfficer","readOnly",false);
        
        	var changedProperty = "LJ_Department";
			var changedPropertyValue = getCaseProperty(theController,"","LJ_Department","value");
			
			
			var serviceName="";
			var servicetype="GET";
			var handler="json";
			var parameterNames=["sol"];
			var value=userId;
			var parameterValues=[value];
			var filterdata="";
			
			   if(value !== undefined || value !== null || value !== ""){
					if (changedProperty === "LJ_Department"){
						if(changedPropertyValue !== undefined || changedPropertyValue !== null || changedPropertyValue !== ""){
								if(changedPropertyValue === "RO"){
									
									serviceName="/laps/userROId/?userId=";
									filterdata= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);	
								}
								else{
									serviceName="/laps/userId/?userId=";
									filterdata= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
								}
							}
					}
			   }else{
				   filterdata= null;
			   }
			
        	
				
				if(filterdata !=null){
				var output = getLPO(filterdata.data,changedPropertyValue);	
				
				var namelist=[];
				for(var i=0;i<output.length;i++ ){							    			
					namelist.push({label:output[i].label, value: output[i].value })
				}
				setCaseProperty(theController,"","LJ_ProcessingOfficer","choices",namelist);				
				
				}
				
				
        	
        },
        
        
         beforeloadactionLPO: function(theController,payload, solution, role, scriptAdaptor){
        
              var user = ecm.model.desktop.userId;
              var userId = user.toUpperCase();
        	var changedProperty = "LJ_Department";
			var changedPropertyValue = getCaseProperty(theController,"","LJ_Department","value");
			setCaseProperty(theController,"","LJ_ProcessingOfficer","readOnly",false);
			
			
			var serviceName="";
			var servicetype="GET";
			var handler="json";
			var parameterNames=["sol"];
			var value=userId;
			var parameterValues=[value];
			var filterdata="";
			
			   if(value !== undefined || value !== null || value !== ""){
					if (changedProperty === "LJ_Department"){
						if(changedPropertyValue !== undefined || changedPropertyValue !== null || changedPropertyValue !== ""){
								if(changedPropertyValue === "RO"){
									
									serviceName="/laps/userROId/?userId=";
									filterdata= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);	
								}
								else{
									serviceName="/laps/userId/?userId=";
									filterdata= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
								}
							}
					}
			   }else{
				   filterdata= null;
			   }
			
        	
				
				if(filterdata !=null){
				var output = getLPO(filterdata.data,changedPropertyValue);	
				
				var namelist=[];
				for(var i=0;i<output.length;i++ ){							    			
					namelist.push({label:output[i].label, value: output[i].value })
				}
				setCaseProperty(theController,"","LJ_ProcessingOfficer","choices",namelist);				
				
				}
        	
       	
     
        },/*
        beforeloadactionGSP: function(theController,payload, solution, role, scriptAdaptor){
        	
        },
        beforeloadactionGMF: function(theController,payload, solution, role, scriptAdaptor){
        	
        },
        beforeloadactionWHC: function(theController,payload, solution, role, scriptAdaptor){
        	
        },
        beforeloadactionWHM: function(theController,payload, solution, role, scriptAdaptor){
        	
        },
        beforeloadactionGRC: function(theController,payload, solution, role, scriptAdaptor){
        	
        },
        beforeloadactionIC: function(theController,payload, solution, role, scriptAdaptor){
        	
        },
        beforeloadactionAPC: function(theController,payload, solution, role, scriptAdaptor){
        //	dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role,scriptAdaptor);
        },
        beforeloadactionFHO: function(theController,payload, solution, role, scriptAdaptor){
        	
          //	dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role,scriptAdaptor);
                	
        },
        beforeloadactionIAB: function(theController,payload, solution, role, scriptAdaptor){
        	//dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role,scriptAdaptor);
        },
        beforeloadactionFCH: function(theController,payload, solution, role, scriptAdaptor){
        	//dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role,scriptAdaptor);
        },
        beforeloadactionIAH: function(theController,payload, solution, role, scriptAdaptor){
        	
        }*/
        
        
	});
    
  
  
  function getLPO(data, department) {
    	
    	 var output = [];
        if (department === "RLPC" || department === "CLPH") {
           
            var users = data.RLPC_users;
            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].rlpcUser_function === "Processing") {
                    usersList["label"] = users[i].rlpcUser_id + " - " + users[i].rlpcUser_name;
                    usersList["value"] = users[i].rlpcUser_id;
                    output.push(usersList);
                }
            }
            return output;
        } else if (department === "RO") {
            
            var users = data.RO_users;
            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].roUser_function === "Processing") {
                    usersList["label"] = users[i].roUser_id + " - " + users[i].roUser_name;
                    usersList["value"] = users[i].roUser_id;
                    output.push(usersList);
                }

            }
            return output;
        } else if (department === "HO") {
           
            var users = data.HO_users;
            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].HOUser_function === "Processing") {
                    usersList["label"] = users[i].HOUser_id + " - " + users[i].HOUser_name;
                    usersList["value"] = users[i].HOUser_id;
                    output.push(usersList);
                }

            }
            return output;
        }else{
        	
        	 return output;
        }
        
    }
        
  	
    function getAge(d1, d2){
	    d2 = d2 || new Date();
	    var diff = d2.getTime() - d1.getTime();
	    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
	}
    
    function setCaseProperty(propcontroller,context,propname,settype,setvalue){
    	try{
    	 if(context ==="F_CaseFolder"){
    		propcontroller.getPropertyController("F_CaseFolder",propname).set(settype,setvalue);
    	}else if(context ==="F_CaseTask"){
    		propcontroller.getPropertyController("F_CaseTask",propname).set(settype,setvalue);
    	}else if(context ==="F_WorkflowField"){
    		propcontroller.getPropertyController("F_WorkflowField",propname).set(settype,setvalue);
    	}else{
    		propcontroller.getPropertyController(propname).set(settype,setvalue);
    	}
    	 return true;
    	}catch (Error) {
    		console.log("Field Update failed -"+propname);
	        alert ("Source Module: Response Action Adaptor\r\n\r\n"+Error.name+" -"+Error.description+"\r\n"+Error.message+" for -"+propname);
	    return false;
	}
    	
    }
   
    function getCaseProperty(propcontroller,context,propname,gettype){
    	try{	
    var caseprop=null;	
   	 if(context ==="F_CaseFolder"){
   		caseprop= propcontroller.getPropertyController("F_CaseFolder",propname).get(gettype);
   	}else if(context ==="F_CaseTask"){
   		caseprop=propcontroller.getPropertyController("F_CaseTask",propname).get(gettype);
   	}else if(context ==="F_WorkflowField"){
   		caseprop= propcontroller.getPropertyController("F_WorkflowField",propname).get(gettype);
   	}else{
   		caseprop=propcontroller.getPropertyController(propname).get(gettype);
   	}
   	 return caseprop;
    	}catch (Error) {
    		console.log("Field Update failed -"+propname);
	        alert ("Source Module: Response Action Adaptor\r\n\r\n"+Error.name+" -"+Error.description+"\r\n"+Error.message+" for -"+propname);
	    return null;
	}
    	
   }
    
  
    
});


