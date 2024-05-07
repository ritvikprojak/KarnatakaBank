require(["dojo/_base/lang",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, Action,Constants, ControllerManager){
    lang.setObject("propupdateaction", {
        "passthrough": function(theController,payload, solution, role, scriptAdaptor){
            return payload;
        },
		
        getRestCall: function (serviceName,handler,servicetype,parameterNames,parameterValues){
			
			
        	var filterData= ""; 
			try{
			var serverBase = window.location.protocol + "\/\/" + window.location.host;
			var parameters="";		
			for(var i=0;i<parameterNames.length;i++){			
				if(i == 0){
					parameters=parameterValues[0];
				}else{
					parameters=parameters+"&&"+parameterNames[i]+"="+parameterValues[i];
				}
				
			}
			
			var feedURL = window.location.origin + +serviceName+parameters;
			var userData = "";
			
			
			var xhrArgs = {            
					url: feedURL,                        
					handleAs: handler,
					sync: true,
					preventCache: true,
					headers: { "Content-Type": "application/json"},            
					load: function(data){    
						filterData = data;
					} ,            
					error: function(error)            
					{            
						alert ("External services query failed due to " + error);    
	
					}            

			};
			if(servicetype === "GET"){
				dojo.xhrGet(xhrArgs);
			}else{
				dojo.xhrPost(xhrArgs);	
			}
			} catch (Error) {
        		alert ("Source Module: "+ ScriptAdaptorScope.arguments.label +" Script Adaptor -setDefaultValue Function\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);
        	}
			/*if(filterData instanceof ){
				return filterData;
			}else if(filterData instanceof ){
				var response="filterData."+serviceName;
				
				return JSON.parse(response);;
			}*/
			
			return filterData;
		},
       
        
         propupdateactionBC: function(theController,payload, solution, role, scriptAdaptor){
        	
        	var user = ecm.model.desktop.userId;
              var userId = user.toUpperCase();
        	var changedProperty = payload.change.id;
			var changedPropertyValue = payload.change.value;
			var myWorkItemEditable = payload.Case;

		
			
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
										if(filterdata !== null){
				var output = getAssigners(filterdata.data,changedPropertyValue);	
				
				var namelist=[];
				for(var i=0;i<output.length;i++ ){							    			
					namelist.push({label:output[i].label, value: output[i].value })
				}
				setCaseProperty(theController,"","LJ_Assigner","choices",namelist);				
				
				}
					}
			   }else{
				   filterdata= null;
			   }
			
        	
			
				
				}
        
	});
    
  
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
    		console.log("Field Update failed -"+propname );
	        alert ("Source Module: Response Action Adaptor\r\n\r\n"+Error.name+" -"+Error.description+"\r\n"+Error.message+" for -"+propname);
	    return null;
	}
    	
   }
    
    function getAssigners(data, department) {
    	
    	 var output = [];
        if (department === "CLPH" || department === "RLPC") {

                      var users = data.RLPC_users;
                      var userClph=users[1].rlpcUser_id; 
                      
					  var serviceName="/laps/userId/?userId=";
						var servicetype="GET";
						var handler="json";
						var parameterNames=["userId"];
                      var value1 =userClph.toUpperCase();
                      var parameterValues=[value1];
                      var filterDataclph= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
                      var clphSolId=filterDataclph.data.user_details.user_solid;

           
            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].rlpcUser_classpower === "130" && users[i].rlpcUser_function === "Delegated Authority") {
                    usersList["label"] = users[i].rlpcUser_id + " - " + users[i].rlpcUser_name;
                    usersList["value"] = clphSolId;
                    output.push(usersList);
                }
            }

//Below code commmented, seperate API and data for RO and CLPH department Assigners.
/*
           var users = data.RO_users;
     
             var userRO=users[1].roUser_id; 
                      var serviceName="/laps/userId/?userId=";
			var servicetype="GET";
			var handler="json";
			var parameterNames=["userId"];
                      var value1 =userRO.toUpperCase();
                      var parameterValues=[value1];
                      var filterDataclph= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
                      var roSolId=filterDataclph.data.user_details.user_solid;       

            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].roUser_classpower === "130" && users[i].roUser_function === "Delegated Authority") {
                    usersList["label"] = users[i].roUser_id + " - " + users[i].roUser_name;
                    usersList["value"] = roSolId;
                    output.push(usersList);
                }

            }
           
           */
            return output;
        } else if (department === "RO") {
            
            var users = data.RO_users;
                     var userRO=users[1].roUser_id; 
                      var serviceName="/laps/userId/?userId=";
			var servicetype="GET";
			var handler="json";
			var parameterNames=["userId"];
                      var value1 =userRO.toUpperCase();
                      var parameterValues=[value1];
                      var filterDataclph= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
                      var roSolId=filterDataclph.data.user_details.user_solid; 
            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].roUser_classpower === "130" && users[i].roUser_function === "Delegated Authority") {
                    usersList["label"] = users[i].roUser_id + " - " + users[i].roUser_name;
                    usersList["value"] = roSolId;
                    output.push(usersList);
                }

            }

//Below code commmented, seperate API and data for RO and CLPH department Assigners.
/*
             var users = data.RLPC_users;

                     var userClph=users[1].rlpcUser_id; 
                      var serviceName="/laps/userId/?userId=";
			var servicetype="GET";
			var handler="json";
			var parameterNames=["userId"];
                      var value1 =userClph.toUpperCase();
                      var parameterValues=[value1];
                      var filterDataclph= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
                      var clphSolId=filterDataclph.data.user_details.user_solid;
             
            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].rlpcUser_classpower === "130" && users[i].rlpcUser_function === "Delegated Authority") {
                    usersList["label"] = users[i].rlpcUser_id + " - " + users[i].rlpcUser_name;
                    usersList["value"] = clphSolId;
                    output.push(usersList);
                }
            }                 
*/
            return output;
        } else if (department === "HO") {
           
            var users = data.HO_users;

            var userHO=users[1].HOUser_id; 
                      var serviceName="/laps/userId/?userId=";
			var servicetype="GET";
			var handler="json";
			var parameterNames=["userId"];
                      var value1 =userHO.toUpperCase();
                      var parameterValues=[value1];
                      var filterDataclph= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
                      var hoSolId=filterDataclph.data.user_details.user_solid;


            for (var i = 0; i < users.length; i++) {
                var usersList = {};
                if (users[i].HOUser_classpower === "130" && users[i].HOUser_function === "Delegated Authority") {
                    usersList["label"] = users[i].HOUser_id + " - " + users[i].HOUser_name;
                    usersList["value"] = hoSolId;
                    output.push(usersList);
                }

            }
            return output;
        }else{
        	
        	 return output;
        }
        
    }
        

    
    function getKeyByValue(data,value) {
    	  return data.filter(
    	      function(data){
    		  return data.value == value
    		  }
    	  );
    	}
    
});