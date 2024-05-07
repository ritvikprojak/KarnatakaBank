require(["dojo/_base/lang",
   "dijit/ConfirmDialog","ecm/model/SearchCriterion","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, ConfirmDialog, Criterion,Constants, ControllerManager){
    lang.setObject("ccinbasket", {
        "passthrough": function(payload, solution, role, scriptAdaptor){
            return payload;
        },

        inbasketfilter: function(payload, solution, role, scriptAdaptor){

        	try {

        		var solutionPrefix = scriptAdaptor.solution.getPrefix();

        	        		var role = ecm.model.desktop.currentRole.name;

        	        		var userName = ecm.model.desktop.userDisplayName;

        	        		var user = ecm.model.desktop.userId;
                                  var userId = user.toUpperCase();
                                  var userIdLoweCase=user.toLowerCase();

        	        		var filterData="";
							var filterData1="";
							var array95=["K418","K419","K420","K424","K425","K426"];
        	        		var array99=["K421","K422","K423","K427","K428","K429"];

        					   var serviceName="/laps/userId/?userId=";

        					   var servicetype="GET";

        					   var handler="json";

        					   var parameterNames=["userId"];

							   var value =userId;
							   
									
								
        					   var parameterValues=[value];

        					  // parameterValues.push(userId);

        					   if(userId !== undefined || userId !== null || userId !== ""){

        						  // filterData= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);

        						  

        					   }else{

        						   filterData= null;

        					   }
							   
							   
							      var serviceName="/laps/userId/?userId=";

        					   var servicetype="GET";

        					   var handler="json";

        					   var parameterNames=["sol"];

							   var value =userId;

							
        					   var parameterValues=[value];

        					  // parameterValues.push(userId);

        					   if(userId !== undefined || userId !== null || userId !== ""){

        						   filterData1= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);

        						  

        					   }else{

        						   filterData1= null;

        					   }


        					   

        		// filterData = JSON.parse(filterData.GetUserDetailsWithAdUser); 

        		

        		var Sol=filterData1.data.user_details.user_solid;
				var Classpower=filterData1.data.user_details.user_classpower;
				var classpower1 = parseInt(Classpower);

        		var roleId=filterData.APPLICATION_SECURITY_CLASS;
				


        		var filter="LJ_SOL_ID = :A ";
        		var filter1="LJ_Assigner = :A";
        		var filter2="LJ_ProcessingOfficer =:A";
        		var filter3="LJ_AssignedBy = :A";
				var filter4="LJ_UserClassPower = :A";

        		var inbasketName = "";

        		var queueName ="";

        		var isCreditRole = false;

        		if( role === "Branch Maker" ){

        			

        			inbasketName= role;

        			queueName = solutionPrefix+"_"+role.replace(/ /g,'');

        			

        			var filterVariable = "";

        				var COFilterQuery = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,

        						"queryFilter": "(LJ_SOL_ID = :A  AND LJ_UserClassPower =:A)",

        						"queryFields": [

        						                {



        						                	"name": "LJ_SOL_ID",

        						                	"type": "xs:string",

        						                	"value":Sol

        						                },
												{



        						                	"name": "LJ_UserClassPower",

        						                	"type": "xs:integer",

        						                	"value":classpower1
													

        						                }

        						                ],

        						                "hideLockedByOther":false

        				};

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);

        				var modelArray = [];

        				modelArray.push(model1);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;
        		}

if( role === "Branch Checker"){

        			classpower1

        			inbasketName= role;

        			queueName = solutionPrefix+"_"+role.replace(/ /g,'');
                           
                            if(classpower1 >= 50)
                            { 
                                var filterVariable = "";

        				var COFilterQuery = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,


                                                 "queryFilter": "(LJ_SOL_ID = :A AND LJ_CreatedBy !=:A)",

        						"queryFields": [

        						                {



        						                	"name": "LJ_SOL_ID",

        						                	"type": "xs:string",

        						                	"value":Sol

        						                },{

										"name": "LJ_CreatedBy",



        						                	"type": "xs:string",



        						                	"value":userId

												}

        						                ],

        						                "hideLockedByOther":false

        				};

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);

        				var modelArray = [];

        				modelArray.push(model1);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;
                            }
                            else
                            {
                              var filterVariable = "";

        				var COFilterQuery = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,

                                                  "queryFilter": "(LJ_SOL_ID = :A AND  LJ_UserClassPower = :A AND LJ_CreatedBy !=:A)",

        						"queryFields": [

        						                {



        						                	"name": "LJ_SOL_ID",

        						                	"type": "xs:string",

        						                	"value":Sol

        						                },
												{



        						                	"name": "LJ_UserClassPower",

        						                	"type": "xs:integer",

        						                	"value": 0
													

        						                }
                                                                 ,

									  {

										"name": "LJ_CreatedBy",

        						                	"type": "xs:string",

        						                	"value":userId
									  }

        						                ],

        						                "hideLockedByOther":false

        				};

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);

        				var modelArray = [];

        				modelArray.push(model1);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;
                            }

        			
        		}

        	else if(role === "Assigner"){

        			

        		if 	(inbasketName = role){

        			queueName = solutionPrefix+"_"+role.replace(/ /g,'');

        			

        			var filterVariable = "";


        				var COFilterQuery1 = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,

        						"queryFilter": "(LJ_Assigner = :A) OR (LJ_Assigner = :B)",

        						"queryFields": [

        						                {



        						                	"name": "LJ_Assigner",

        						                	"type": "xs:string",

        						                	"value": [ Sol , userId ]

        						                }

        						                ],

        						                "hideLockedByOther":false

        				};
        				
        				var COFilterQuery2 = {



        						"queueName": "LJ_LoanProcessingOfficer",

        						"inbasketName":"AssignedBy Inbasket",

        						"hideFilterUI":false,

        						"queryFilter": "(LJ_Assigner = :A) OR (LJ_Assigner = :B)",

        						"queryFields": [

        						                {

        						                	"name": "LJ_Assigner",

        						                	"type": "xs:string",

        						                	"value": [ Sol , userId ]

        						                }

        						                ],

        						                "hideLockedByOther":false

        				};
        				

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery1);
        				var model2 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery2);

        				var modelArray = [];

        				modelArray.push(model1);
        				modelArray.push(model2);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;
				}
				
				else if(inbasketName = "Assigner Assigned To"){
					
        			queueName = solutionPrefix+"_"+role.replace(/ /g,'');
	

        			var filterVariable = "";

        				var COFilterQuery = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,

        						"queryFilter": "(LJ_Assigner = :A) OR (LJ_Assigner = :B)",

        						"queryFields": [

        						                {

        						                	"name": "LJ_Assigner ",

        						                	"type": "xs:string",

        						                	"value": [ Sol , userId ]

        						                }

        						                ],

        						                "hideLockedByOther":false

        				};

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);

        				var modelArray = [];

        				modelArray.push(model1);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;
	
					
				}
        		}

				

				else if(role === "Loan Processing Officer"){

        			

        			if (inbasketName = role){

        			queueName = solutionPrefix+"_"+role.replace(/ /g,'');

        			

        			var filterVariable = "";
			
			

        				var COFilterQuery = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,

        						"queryFilter": filter2,

        						"queryFields": [

        						                {



        						                	"name": "LJ_ProcessingOfficer",

        						                	"type": "xs:string",

        						                	"value": userId 

        						                }

        						                ],

        						                "hideLockedByOther":false

        				};

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);

        				var modelArray = [];

        				modelArray.push(model1);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;

					}
					
					else if (inbasketName =="AssignedBy Inbasket"){
				

        			queueName = solutionPrefix+"_"+role.replace(/ /g,'');
	

        			var filterVariable = "";

        				var COFilterQuery = {



        						"queueName": queueName,

        						"inbasketName":inbasketName,

        						"hideFilterUI":false,

        						"queryFilter": filter2,

        						"queryFields": [

        						                {



        						                	"name": "LJ_ProcessingOfficer",

        						                	"type": "xs:string",

        						                	"value": userId 

        						                }

        						                ],

        						                "hideLockedByOther":false

        				};

        				console.log("COFilterQuery"+COFilterQuery);

        				var model1 = icm.model.InbasketDynamicFilter.fromJSON(COFilterQuery);

        				var modelArray = [];

        				modelArray.push(model1);

        				var filterpayload = {"dynamicFilters": modelArray, "cursorLocation": 1,"cleanDynamicFilterByReset":false}; 

        				return filterpayload;


				}
        		}

				

        	}

        	catch (Error) {

        		alert ("Source Module: " + self.name + "\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);

        	}



        }

        

        

	});

});