require(["dojo/_base/lang",
    "icm/action/Action", "icm/base/Constants","ecm/model/Request","dijit/ConfirmDialog", "icm/model/properties/controller/ControllerManager", "dojo/dom-attr", "dojo/dom-style"], function (lang, Action, Constants,Request,ConfirmDialog, ControllerManager, domAttr, domStyle) {
    lang.setObject("ccresponseaction", {
        "passthrough": function (payload, solution, role, scriptAdaptor) {
            return payload;
        },

        decisionaction: function (payload, solution, role, scriptAdaptor) {
            try {


            	var _this=this;
                var responseself = scriptAdaptor;
                console.log("***** responseself *****");
                console.log(responseself);
                var coordination = payload.coordination;
                responseself.editable = payload.workItemEditable;
                var solution = responseself.solution;
                var prefix = solution.getPrefix();
                var userName = ecm.model.desktop.userDisplayName;
                var userId = ecm.model.desktop.userId;
                var role = ecm.model.desktop.currentRole.name;

                removeResponseButtons(role, responseself.editable);

                require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function (Constants, ControllerManager) {

                    //METHOD WHICH IS CALLED BEFORE LOADING WIDGET IS FINISHED
                    coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET, function (context, complete, abort) {
                        /* Obtain the controller binding for the editable. */
                        if (!responseself.hasOwnProperty('propsController')) {
                            responseself.propsController = ControllerManager.bind(responseself.editable);
                            var step = responseself.editable.icmWorkItem.stepName;

                            var theController = responseself.propsController;


                            if (role === "Assigner") {
                                beforeloadaction.beforeloadactionAO(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "Loan Processing Officer") {
                                beforeloadaction.beforeloadactionLPO(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Branch Checker") {
                                var user = ecm.model.desktop.userId;
                                var userId = user.toUpperCase();

                                var serviceName = "/laps/userId/?userId=";
                                var servicetype = "GET";
                                var handler = "json";
                                var parameterNames = ["sol"];
                                var value = userId;
                               
                                var parameterValues = [value];
                                var filterdata = "";

                                if (value !== undefined || value !== null || value !== "") {
                                    filterdata = addcasescript.getRestCall(serviceName, handler, servicetype, parameterNames, parameterValues);
                                } else {
                                    filterdata = null;
                                }

                                beforeloadaction.beforeloadactionBC(theController, payload, this.solution, this.role, scriptAdaptor, filterdata);

                            } else if (role === "GM SPARE PARTS") {
                                beforeloadaction.beforeloadactionGSP(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "GM FINANCE") {
                                beforeloadaction.beforeloadactionGMF(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "WH CLERK") {
                                beforeloadaction.beforeloadactionWHC(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "WH MANAGER") {
                                beforeloadaction.beforeloadactionWHM(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "GRN CLERK") {
                                beforeloadaction.beforeloadactionGRC(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "INVENTORY CLERK") {
                                beforeloadaction.beforeloadactionIC(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "AP Clerk") {
                                beforeloadaction.beforeloadactionAPC(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Finance HOD") {
                                beforeloadaction.beforeloadactionFHO(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit") {
                                beforeloadaction.beforeloadactionIAB(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit BU") {
                                beforeloadaction.beforeloadactionIAB(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Finance Clerk HO") {
                                beforeloadaction.beforeloadactionFCH(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit BU") {
                                beforeloadaction.beforeloadactionIAH(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit HO") {
                                beforeloadaction.beforeloadactionIAH(theController, payload, this.solution, this.role, scriptAdaptor);


                            } else if (role === "Finance Clerk") {
                                beforeloadaction.beforeloadactionFCH(theController, payload, this.solution, this.role, scriptAdaptor);

                            }

                        }
                        /* Call the coordination completion method. */
                        complete();
                    });


                    //METHOD WHICH IS CALLED WHEN LOADING WIDGET IS FINISHED
                    coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function (context, complete, abort) {
                        /* Obtain the controller binding for the editable. */


                        /*if(payload.caseEditable != undefined){
                         caseEdit=payload.caseEditable;
                         page="addCase";
                         }else if(payload.workItemEditable){
                         caseEdit=payload.workItemEditable;
                         page="workDetail";
                         }*/

                        /*
                         
                         var coord = payload.coordination;
                         var solution = this.solution;
                         var prefix = "IPS";
                         //alert("before req");
                         
                         
                         if(coord){
                         //alert("1");
                         //coord.participate(Constants.CoordTopic.LOADWIDGET, function(context, complete, abort) {
                         //      	alert("2");        		        
                         if (payload.workItemEditable.icmWorkItem.ecmWorkItem.attributes.hasOwnProperty("IPS_Status")){
                         //    	        	alert("3");
                         var automated = payload.workItemEditable.icmWorkItem.ecmWorkItem.attributes["IPS_Status"];
                         alert(automated);                
                         if(automated){
                         
                         var nodeSearch = dojo.query('.icmCaseSearch icmPageWidget');
                         
                         
                         //         domStyle.set(nodeSearch[0].domNode, 'display', 'none');
                         }
                         
                         
                         }
                         
                         
                         
                         complete();
                         // });
                         }*/






                        if (!responseself.hasOwnProperty('propsController')) {
                            responseself.propsController = ControllerManager.bind(responseself.editable);

                        }


                        if (role === "PO Clerk") {

                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);

                        } else if (role === "PO Manager") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Warehouse Clerk") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Warehouse Manager") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "GRN Clerk") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "AP Clerk") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Finance HOD") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Internal Audit") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Internal Audit BU") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Finance Clerk HO") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Internal Audit HO") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Finance Clerk") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        }



                        /* Call the coordination completion method. */
                        complete();
                    });
                    // Callbacks to clean up when the user completes or
                    // cancels the task creation
                    //METHOD WHICH IS CALLED WHEN WE CLICK ON CALCEL BUTTON AFTER COMPLETION CANCEL ACTION
                    coordination.participate(Constants.CoordTopic.AFTERCANCEL, function (context, complete, abort) {
                        if (responseself.editable) {
                            ControllerManager.unbind(responseself.editable);
                            delete responseself.editable;
                            delete responseself.propsController;
                        }
                        complete();
                    });

                    //METHOD WHICH IS CALLED WHEN WE CLICK ON ANY DISPATCH BUTTON AFTER COMPLETION DISPATCH ACTION
                    coordination.participate(Constants.CoordTopic.AFTERCOMPLETE, function (context, complete, abort) {
                        if (responseself.editable) {
                            ControllerManager.unbind(responseself.editable);
                            delete responseself.editable;
                            delete responseself.propsController;
                        }
                        complete();
                    });


                    //METHOD WHICH IS CALLED WHEN WE CLICK ON ANY DISPATCH BUTTON BEFORE COMPLETION DISPATCH ACTION
                    coordination.participate(Constants.CoordTopic.BEFORECOMPLETE, function (context, complete, abort) {

                        debugger;
                        
                        var theController = responseself.propsController;

                        var step = responseself.editable.icmWorkItem.stepName;
                        var today = new Date();

                        if (role === "Assigner") {
                            setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", true);
                            ////
                            setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return") {
                               setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", false);
                               setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);

                               
                               var serviceParams = new Object();
                               var ljROR = getCaseProperty(theController, "", "LJ_ReasonforReturning", "value");
                               var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");
                               var folderId =  responseself.editable.icmWorkItem.caseFolderId;

                               serviceParams.type = "both";
                               serviceParams.LAR =larNumber.trim();
                               serviceParams.folderId = folderId;
                               if(ljROR)
                               	{
                                   serviceParams.reason = ljROR;
	
                               	}
                               else
                               	{
                                   //serviceParams.reason = "cmp"; //commented by vara
                            	   serviceParams.reason = "";

                               	}
                               
                               console.log("serviceparams--",serviceParams);
                              
               	        	
                                var processingOfficer = getCaseProperty(theController, "", "LJ_ProcessingOfficer", "value");
                               

                        		console.log("this.payload,",_this);
                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to Retrun this case ",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                        	            setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                        setCaseProperty(theController, "", "LJ_AssignersSubmittedTime", "value", today);
                                        
                                        
                                        callDBService(serviceParams);

                                        setupdateReturnedDate("Assigner Returned",new Date(),larNumber)
                                        setupdateCaseStatus("Checker",larNumber);

                                        
                                       /* Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
                                            requestParams: serviceParams,
                                            requestCompleteCallback: function(ResultResponse) {
                                            console.log("response is ",ResultResponse);	
                                            }
                        	        	}) */
                                        
                        	        	complete();
                        	        }});
                            	confirmDialog.show();

                        	

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "REJECT") {
                            	
                               // setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);
                                complete();

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                            	
                               // setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                                var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");

                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to Terminate this case ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                                        setupdateCaseStatus("Cancelled",larNumber);

                        	        	complete();
                        	        }});
                            	confirmDialog.show();


                        	

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "RESUBMIT") {
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit")
                            {
                               setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);
                               setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", true);

                                var processingOfficer = getCaseProperty(theController, "", "LJ_ProcessingOfficer", "value");

                               // alert("case is submitted to ---" + processingOfficer);
	
                        		console.log("this.payload,",_this);
                        		//added by vara
                        		var serviceParams = new Object();
                                var ljROR = getCaseProperty(theController, "", "LJ_ReasonforReturning", "value");
                                var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");
                                var folderId =  responseself.editable.icmWorkItem.caseFolderId;

                                serviceParams.type = "both";
                                serviceParams.LAR =larNumber.trim();
                                serviceParams.folderId = folderId;
                                if(ljROR)
                                	{
                                    serviceParams.reason = ljROR;
 	
                                	}
                                else
                                	{
                                	//serviceParams.reason = "cmp"; //commented by vara
                             	   serviceParams.reason = "";

                                	}
                                
                                console.log("serviceparams--",serviceParams);
                        		//above added by vara
                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to submit this case to Loan Processing Officer: "+processingOfficer+"?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                                        setupdateCaseStatus("Loan Procesing Officer",larNumber);
                                        callDBService(serviceParams);//added by vara
                        	            setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                        setCaseProperty(theController, "", "LJ_AssignersSubmittedTime", "value", today);
                        	        	complete();
                        	        }});
                            	confirmDialog.show();

                        	

                            } else {
                                complete();
                            }



                        } else if (role === "Branch Checker")  // commit ----------------------------------------------
                        {
                  		  setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                        	if(context[Constants.CoordContext.WKITEMRESPONSE] === "Submit"){
                        		
                        		console.log("this.payload,",_this.editable);
                        		 var submittedTime;
                        		 var larNumber;
                        		 var asgFlag;
                        		if(theController)
                	        	{
                                    setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);
                                    console.log("thecontoller",theController);

                                    var controller=theController.getPropertyController("F_CaseFolder", "LJ_ReasonforReturning");
                                    console.log("controller value updated",controller);
                                    if(controller.collection.propertyControllers.LJ_ReasonforReturning.model.value == null){
                                    	
                                    }else{
                                    	 setCaseProperty(theController, "", "LJ_ReasonforReturning", "value","NA");
                                         console.log("value updated");
                                    }
                                    /*setCaseProperty(theController, "", "LJ_ReasonforReturning", "value",null);
                                    console.log("value updated");*/
                                   // console.log("value updated");
                                  //setCaseProperty(theController, "", "LJ_ReasonforReturning", "value", 'NA');

                                	  //submittedTime = getCaseProperty(theController, "", "LJ_BranchCheckersSubmittedTime", "value");
                        			  larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");
                        			  asgFlag = getCaseProperty(theController, "", "LJ_AssignerFlag", "value");
                        			console.log("asgFlag",asgFlag);
                        			  if(!asgFlag)
                        				  {
                            			  asgFlag =false;
 
                        				  }
                        			  

                	        	}	
                        		//added by vara
                        		var serviceParams = new Object();
                                var ljROR = getCaseProperty(theController, "", "LJ_ReasonforReturning", "value");
                                var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");
                                var folderId =  responseself.editable.icmWorkItem.caseFolderId;
                                  
                                if(ljROR)
                            	{
                                serviceParams.reason = ljROR;

                            	}
                            else
                            	{
                                serviceParams.reason = "..";

                            	}
                                serviceParams.type = "both";
                                serviceParams.LAR =larNumber.trim();
                                serviceParams.folderId = folderId;
                                serviceParams.reason =ljROR;
                                console.log("serviceparams--",serviceParams);
                                
                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to submit this case to Assigner ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                        	        	
                        	        // added by vara
                        	        callDBService(serviceParams);
                        	       	 setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                        	       	 
                        	       	 setupdateCheckrSubmitsTime(submittedTime,larNumber);
                        	       	 
                        	       	 setupdateCaseStatus("Assigner",larNumber);
                        	       	 
                        	       	
                        	       	 if(asgFlag==true)
                        	       		 {
                        	       		//setupdateReturnedDate("AssignerReturnedDate",new Date(),larNumber);//commented by vara
                        	       		setupdateReturnedDate("Checker SubmittedDate",new Date(),larNumber);//added by vara
                        	       		 }
                        	        	complete();
                        	        }});
                            	confirmDialog.show();

                        	}
                        	else if(context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate"){
                                var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");

                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to Terminate this case ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        	
                        	        },
                        	        onExecute: function(){
                           	       	 setupdateCaseStatus("Cancelled",larNumber);

                        	        	complete();
                        	        }});
                            	confirmDialog.show();


                        	}
                        	else
                            {
                                setCaseProperty(theController, "", "LJ_Assigner", "required", false);
                                setCaseProperty(theController, "", "LJ_Department", "required", false);
                                complete();
                            }
                            } else if (role === "Branch Maker")  // commit 
                        {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit")
                            {

                              
                  			  var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");

                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to submit this case to Checker ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                        	        	  setCaseProperty(theController, "", "LJ_BranchMakersSubmittedTime", "value", today);
                                          setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                          setCaseProperty(theController, "", "LJ_CreatedBy", "value", userId);    
                                         setupdateCaseStatus("Branch Checker",larNumber);

                        	        	complete();
                        	        }});
                            	confirmDialog.show();

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate")
                            {
                        		
                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to Terminate this case ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                           	       	 setupdateCaseStatus("Canceled",larNumber);

                        	        	complete();
                        	        }});
                            	confirmDialog.show();


                        	} else
                            {
                                setCaseProperty(theController, "", "LJ_CreatedBy", "value", userId);
                                complete();
                            }
                        } else if (role === "Loan Processing Officer") {
                            setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete")
                            {
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                                
                                var serviceParams = new Object();
                                var ljROR = getCaseProperty(theController, "", "LJ_ReasonforReturning", "value");
                                var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");
                                var folderId =  responseself.editable.icmWorkItem.caseFolderId;

                                serviceParams.type = "both";
                                serviceParams.LAR =larNumber.trim();
                                serviceParams.folderId = folderId;
                                if(ljROR)
                                	{
                                    serviceParams.reason = ljROR;
	
                                	}
                                else
                                	{
                                    serviceParams.reason = "..";

                                	}
                                
                                console.log("serviceparams--",serviceParams);
                             	
                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to complete this case ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                        	        	
                        	        	setupdateCaseStatus("Case Completed",larNumber);
                        	        	  callDBService(serviceParams);
                                          
                                          /* Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
                                               requestParams: serviceParams,
                                               requestCompleteCallback: function(ResultResponse) {
                                               console.log("response is ",ResultResponse);	
                                               }
                           	        	}) */
                        	        	
                        	        	
                        	        	complete();
                        	        }});
                            	confirmDialog.show();


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return")
                            {
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);
                                
                                var serviceParams = new Object();
                                var ljROR = getCaseProperty(theController, "", "LJ_ReasonforReturning", "value");
                                var larNumber = getCaseProperty(theController, "", "LJ_LARNumber", "value");
                                var folderId =  responseself.editable.icmWorkItem.caseFolderId;
                                  
                                if(ljROR)
                            	{
                                serviceParams.reason = ljROR;

                            	}
                            else
                            	{
                                serviceParams.reason = "..";

                            	}
                                serviceParams.type = "both";
                                serviceParams.LAR =larNumber.trim();
                                serviceParams.folderId = folderId;
                                serviceParams.reason =ljROR;
                                console.log("serviceparams--",serviceParams);
                        		
                        		var confirmDialog = new ConfirmDialog({
                        	        title: "Completing Case",
                        	        content: "Are you sure you want to Return this case ?",
                        	        buttonCancel: "Yes",
                        	        buttonOk: "No",
                        	        style: "width: 200px",
                        	        onCancel: function(){
                        	        	abort({'silent':true});
                        	        },
                        	        onExecute: function(){
                        	        	
                        	        	  callDBService(serviceParams);
                                       setupdateCaseStatus("Assigner",larNumber);
 
                                          /* Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
                                               requestParams: serviceParams,
                                               requestCompleteCallback: function(ResultResponse) {
                                               console.log("response is ",ResultResponse);	
                                               }
                           	        	}) */
                        	        	
                        	        	
                        	        	complete();
                        	        }});
                            	confirmDialog.show();


                        	

                            } else
                            {
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);
                                setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                complete();
                            }
                        } else if (role === "PO MANAGER") {

                        } else if (role === "GM SPare Parts") {

                        } else if (role === "GM FINANCE") {

                        } else if (role === "WH CLERK") {

                        } else if (role === "WH MANAGER") {

                        } else if (role === "GRN CLERK") {

                        } else if (role === "INVENTORY CLERK") {

                        } else if (role === "AP ClERK") {

                        } else if (role === "FINANCE HOD") {

                        } else if (role === "INTERNAL AUDIT BU") {

                        } else if (role === "FINANCE CLERK HO") {

                        } else if (role === "INTERNAL AUDIT HO") {

                        } else {
                            complete();
                        }


                    });



                    //METHOD WHICH IS CALLED WHEN WE CLICK ON SAVE BUTTON
                    coordination.participate(Constants.CoordTopic.COMMIT, function (context, complete, abort) {

                       debugger;

                        var theController = responseself.propsController;


                        var step = responseself.editable.icmWorkItem.stepName;
                        var today = new Date();

                        //changes made by nitin

                        if (role === "Branch Checker")
                        {
                            setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return")
                            {
                            	var controller=theController.getPropertyController("F_CaseFolder", "LJ_ReasonforReturning");//added by vara
                            	if(controller.collection.propertyControllers.LJ_ReasonforReturning.model.value == "NA"){
                            		setCaseProperty(theController, "", "LJ_ReasonforReturning", "value","");//added by vara
                            	}
                                setCaseProperty(theController, "", "LJ_Assigner", "required", false);
                                setCaseProperty(theController, "", "LJ_Department", "required", false);
                                complete();

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit")
                            {
                                setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                setCaseProperty(theController, "", "LJ_Assigner", "required", true);
                                setCaseProperty(theController, "", "LJ_Department", "required", true);
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);
                                var controller=theController.getPropertyController("F_CaseFolder", "LJ_ReasonforReturning");
                                console.log("controller value updated",controller);
                               /* setCaseProperty(theController, "", "LJ_ReasonforReturning", "value",null);
                                console.log("value updated");*/
                                if(controller.collection.propertyControllers.LJ_ReasonforReturning.model.value == null){
                                	
                                }else{
                                	 setCaseProperty(theController, "", "LJ_ReasonforReturning", "value","NA");
                                     console.log("value updated");
                                }
                                //var processingOfficer =	getCaseProperty(theController,"","LJ_ProcessingOfficer","value"); 							

                                //console.log("case is submitted to ---"+processingOfficer);
                                complete();

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate")
                            {
                                setCaseProperty(theController, "", "LJ_Assigner", "required", false);
                                setCaseProperty(theController, "", "LJ_Department", "required", false);
                                //var processingOfficer =	getCaseProperty(theController,"","LJ_ProcessingOfficer","value"); 							

                                //console.log("case is submitted to ---"+processingOfficer);
                                complete();

                            } else {
                                setCaseProperty(theController, "", "LJ_Assigner", "required", false);
                                setCaseProperty(theController, "", "LJ_Department", "required", false);
                                //var processingOfficer =	getCaseProperty(theController,"","LJ_ProcessingOfficer","value"); 							

                                //console.log("case is submitted to ---"+processingOfficer);
                                complete();
                            }

                            /*
                             
                             if(context[Constants.CoordContext.WKITEMRESPONSE] === "Return")
                             {	
                             setCaseProperty(theController,"","LJ_Assigner","required",false);
                             setCaseProperty(theController,"","LJ_Department","required",false);
                             complete();
                             
                             }
                             else if(context[Constants.CoordContext.WKITEMRESPONSE] === "Submit")
                             {	
                             setCaseProperty(theController,"","LJ_Assigner","required",true);
                             setCaseProperty(theController,"","LJ_Department","required",true);
                             complete();
                             
                             }
                             */
                        } else if (role === "Branch Maker")  // commit 
                        {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit" || context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate")
                            {

                                complete();

                            } else
                            {
                                setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                setCaseProperty(theController, "", "LJ_CreatedBy", "value", userId);
                                var confirmDialog = new ConfirmDialog({
                                    title: "Completing Case",
                                    content: "Are you sure you want to save this case ?",
                                    buttonCancel: "Yes",
                                    buttonOk: "No",
                                    style: "width: 200px",
                                    onCancel: function(){
                                    	abort({'silent':true});
                                    },
                                    onExecute: function(){
                                    	//this.onBroadcastEvent("icm.ClosePage",payload);

                                    	complete();
                                    }});
                            	confirmDialog.show();
                            }
                        } else if (role === "Loan Processing Officer") {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete")
                            	{
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);
                                complete();
                            	}
                            	
                            else if(context[Constants.CoordContext.WKITEMRESPONSE] === "Return")
                            	
                            {
                            	var controller=theController.getPropertyController("F_CaseFolder", "LJ_ReasonforReturning");//added by vara
                            	if(controller.collection.propertyControllers.LJ_ReasonforReturning.model.value == "NA"){
                            		setCaseProperty(theController, "", "LJ_ReasonforReturning", "value","");//added by vara
                            	}
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);

                                complete();

                            } else if(context[Constants.CoordContext.WKITEMRESPONSE] === "Reassign")
                            	{
                            	  setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                            	}
                            else
                            {
                                var confirmDialog = new ConfirmDialog({
                                    title: "Completing Case",
                                    content: "Are you sure you want to Reassign this case ?",
                                    buttonCancel: "Yes",
                                    buttonOk: "No",
                                    style: "width: 200px",
                                    onCancel: function(){
                                    	abort({'silent':true});
                                    },
                                    onExecute:lang.hitch(this,function(){
                                    	
                                        setCaseProperty(theController, "", "LJ_TimeStamp", "value", today);
                                    	this.onBroadcastEvent("icm.ClosePage",payload);
                                        complete();
                                        
                                    })});
                            	confirmDialog.show();
                                complete();
                            }
                        } else if (role === "Assigner") {

                            setCaseProperty(theController, "", "LJ_AssignedBy", "value", userId);
                            setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", false);

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return")
                            {
                            	var controller=theController.getPropertyController("F_CaseFolder", "LJ_ReasonforReturning");//added by vara
                            	if(controller.collection.propertyControllers.LJ_ReasonforReturning.model.value == "NA"){
                            		setCaseProperty(theController, "", "LJ_ReasonforReturning", "value","");//added by vara
                            	}
                            	
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", true);
                                setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", false);
                            	complete();

                            
                            
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit")
                            {
                                setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                                setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", true);
                                //added by Varaprasad
                                if(theController.collections.F_CaseFolder.propertyControllers.LJ_ReasonforReturning.model.value  == null){
                                	
                                }else{
                                	 setCaseProperty(theController, "", "LJ_ReasonforReturning", "value","NA");
                                     console.log("value updated");
                                }

                            	complete();

                            } else {

                                setCaseProperty(theController, "", "LJ_ProcessingOfficer", "required", false);

                            	console.log("this.payload,",_this);
                            	
                            	var confirmDialog = new ConfirmDialog({
                                    title: "Save Case",
                                    content: "Are you sure want to save and Reassign this case ?",
                                    buttonCancel: "Yes",
                                    buttonOk: "No",
                                    style: "width: 200px",
                                    onCancel: function(){
                                    	abort({'silent':true});
                                    },
                                    onExecute: lang.hitch(this,function(){
                                   // this.onBroadcastEvent("icm.ClosePage",payload);
                                        setCaseProperty(theController, "", "LJ_ReasonforReturning", "required", false);

                                    	complete();
                                    })});
                            	confirmDialog.show();
                            	
                            	
                            	

                            }

                        } else if (role === "PO Clerk") {






                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {



                                var standardpo = getCaseProperty(theController, "", "IPS_StandardPONumber", "value");


                                if (standardpo !== null && standardpo !== undefined && standardpo !== "")

                                {

                                    var checkval = confirm("Are you sure you want to submit this case ?");
                                    if (checkval) {

                                        complete();

                                    } else {

                                        abort({silent: true});
                                    }
                                } else {

                                    abort({"message": "Standard PO number cannot be empty!"});

                                }

                                /*  var addCommentDialog = new AddCommentDialog({
                                 artifactType : "Case",
                                 artifactLabel : myStepName,
                                 commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
                                 caseModel : myCase,
                                 workItem :self.workitemEdit.icmWorkItem,
                                 onClickClose : function() {
                                 
                                 },
                                 onClickOk : function(){
                                 alert("ok"); 
                                 
                                 }
                                 });*/

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To PO Manager") {

                                var checkval = confirm("Are you sure you want to return this case to PO Manager ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "TERMINATE") {
                                complete();


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "RESUBMIT") {

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Register") {

                                var checkval = confirm("Are you sure you want to register this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Save as Draft") {

                                var checkval = confirm("Are you sure you want to save this case data ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Close") {

                                var checkval = confirm("Are you sure you want to close this case?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else {
                                complete();
                            }

                        } else if (role === "PO Manager") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Save as Draft") {

                                var checkval = confirm("Are you sure you want to save this case data ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Close") {

                                var checkval = confirm("Are you sure you want to close this case?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "GM Spare Parts") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else {
                                complete();
                            }
                        } else if (role === "GM FINANCE") {

                        } else if (role === "Warehouse Clerk") {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Add") {
                                var checkval = confirm("Are you sure you want to Add this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Cancel") {
                                var checkval = confirm("Are you sure you want to Add this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To WH Manager") {
                                var checkval = confirm("Are you sure you want to return this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else {
                                complete();
                            }
                        } else if (role === "Warehouse Manager") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "GRN Clerk") {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Fetch GRN") {
                                var checkval = confirm("Are you sure you want to Fetch GRN for this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To WH") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }


                        } else if (role === "INVENTORY CLERK") {

                        } else if (role === "AP Clerk") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete") {
                                var checkval = confirm("Are you sure you want to complete this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "Finance HOD") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete") {
                                var checkval = confirm("Are you sure you want to complete this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }

                        } else if (role === "Finance Clerk HO") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete") {
                                var checkval = confirm("Are you sure you want to complete this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "Internal Audit HO") {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete") {
                                var checkval = confirm("Are you sure you want to complete this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }



                        } else if (role === "Internal Audit BU") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete") {
                                var checkval = confirm("Are you sure you want to complete this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else {
                            complete();
                        }

                    });



                });

                return payload;

            } catch (exception) {
                alert(exception);
            }

        },

        advancedecisionaction: function (payload, solution, role, scriptAdaptor) {
            try {



                var responseself = scriptAdaptor;
                console.log("***** responseself *****");
                console.log(responseself);
                var coordination = payload.coordination;
                responseself.editable = payload.workItemEditable;
                var solution = responseself.solution;
                var prefix = solution.getPrefix();
                var userName = ecm.model.desktop.userDisplayName;
                var userId = ecm.model.desktop.userId;
                var role = ecm.model.desktop.currentRole.name;

                removeResponseButtons(role, responseself.editable);

                require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function (Constants, ControllerManager) {

                    //METHOD WHICH IS CALLED BEFORE LOADING WIDGET IS FINISHED
                    coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET, function (context, complete, abort) {
                        /* Obtain the controller binding for the editable. */
                        if (!responseself.hasOwnProperty('propsController')) {
                            responseself.propsController = ControllerManager.bind(responseself.editable);
                            var step = responseself.editable.icmWorkItem.stepName;

                            var theController = responseself.propsController;


                            if (role === "PO Clerk") {
                                beforeloadaction.beforeloadactionPO(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "PO Manager") {
                                beforeloadaction.beforeloadactionPM(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "GM SPARE PARTS") {
                                beforeloadaction.beforeloadactionGSP(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "GM FINANCE") {
                                beforeloadaction.beforeloadactionGMF(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "WH CLERK") {
                                beforeloadaction.beforeloadactionWHC(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "WH MANAGER") {
                                beforeloadaction.beforeloadactionWHM(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "GRN CLERK") {
                                beforeloadaction.beforeloadactionGRC(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "INVENTORY CLERK") {
                                beforeloadaction.beforeloadactionIC(theController, payload, this.solution, this.role, scriptAdaptor);
                            } else if (role === "AP Clerk") {
                                beforeloadaction.beforeloadactionAPC(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Finance HOD") {
                                beforeloadaction.beforeloadactionFHO(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit") {
                                beforeloadaction.beforeloadactionIAB(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit BU") {
                                beforeloadaction.beforeloadactionIAB(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Finance Clerk HO") {
                                beforeloadaction.beforeloadactionFCH(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit BU") {
                                beforeloadaction.beforeloadactionIAH(theController, payload, this.solution, this.role, scriptAdaptor);

                            } else if (role === "Internal Audit HO") {
                                beforeloadaction.beforeloadactionIAH(theController, payload, this.solution, this.role, scriptAdaptor);


                            } else if (role === "Finance Clerk") {
                                beforeloadaction.beforeloadactionFCH(theController, payload, this.solution, this.role, scriptAdaptor);

                            }

                        }
                        /* Call the coordination completion method. */
                        complete();
                    });


                    //METHOD WHICH IS CALLED WHEN LOADING WIDGET IS FINISHED
                    coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function (context, complete, abort) {
                        /* Obtain the controller binding for the editable. */


                        /*if(payload.caseEditable != undefined){
                         caseEdit=payload.caseEditable;
                         page="addCase";
                         }else if(payload.workItemEditable){
                         caseEdit=payload.workItemEditable;
                         page="workDetail";
                         }*/

                        /*	
                         
                         var coord = payload.coordination;
                         var solution = this.solution;
                         var prefix = "IPS";
                         //alert("before req");
                         
                         
                         if(coord){
                         //alert("1");
                         //coord.participate(Constants.CoordTopic.LOADWIDGET, function(context, complete, abort) {
                         //      	alert("2");        		        
                         if (payload.workItemEditable.icmWorkItem.ecmWorkItem.attributes.hasOwnProperty("IPS_Status")){
                         //    	        	alert("3");
                         var automated = payload.workItemEditable.icmWorkItem.ecmWorkItem.attributes["IPS_Status"];
                         alert(automated);                
                         if(automated){
                         
                         var nodeSearch = dojo.query('.icmCaseSearch icmPageWidget');
                         
                         
                         //         domStyle.set(nodeSearch[0].domNode, 'display', 'none');
                         }
                         
                         
                         }
                         
                         
                         
                         complete();
                         // });
                         }*/






                        if (!responseself.hasOwnProperty('propsController')) {
                            responseself.propsController = ControllerManager.bind(responseself.editable);

                        }


                        if (role === "PO Clerk") {

                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);

                        } else if (role === "PO Manager") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Warehouse Clerk") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Warehouse Manager") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "GRN Clerk") {
                            dashboardscript.getAdvanceInvoiceList(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "AP Clerk") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Finance HOD") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Internal Audit") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Internal Audit BU") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Finance Clerk HO") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Internal Audit HO") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        } else if (role === "Finance Clerk") {
                            dashboardscript.getinvoiceListforFinance(payload, this.solution, this.role, scriptAdaptor);
                        }



                        /* Call the coordination completion method. */
                        complete();
                    });
                    // Callbacks to clean up when the user completes or
                    // cancels the task creation
                    //METHOD WHICH IS CALLED WHEN WE CLICK ON CALCEL BUTTON AFTER COMPLETION CANCEL ACTION
                    coordination.participate(Constants.CoordTopic.AFTERCANCEL, function (context, complete, abort) {
                        if (responseself.editable) {
                            ControllerManager.unbind(responseself.editable);
                            delete responseself.editable;
                            delete responseself.propsController;
                        }
                        complete();
                    });

                    //METHOD WHICH IS CALLED WHEN WE CLICK ON ANY DISPATCH BUTTON AFTER COMPLETION DISPATCH ACTION
                    coordination.participate(Constants.CoordTopic.AFTERCOMPLETE, function (context, complete, abort) {
                        if (responseself.editable) {
                            ControllerManager.unbind(responseself.editable);
                            delete responseself.editable;
                            delete responseself.propsController;
                        }
                        complete();
                    });


                    //METHOD WHICH IS CALLED WHEN WE CLICK ON ANY DISPATCH BUTTON BEFORE COMPLETION DISPATCH ACTION-----------------------------------------------------
                    coordination.participate(Constants.CoordTopic.BEFORECOMPLETE, function (context, complete, abort) {


                        var theController = responseself.propsController;

                        if (role === "PO Clerk") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "SUBMIT") {

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "REJECT") {

                                complete();

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "TERMINATE") {
                                complete();


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "RESUBMIT") {

                            } else {
                                complete();
                            }

                        } else if (role === "PO Manager") {
                            complete();
                        } else if (role === "GM Spare Parts") {
                            complete();
                        } else if (role === "GM Finance")
                        {
                            complete();
                        } else if (role === "WH CLERK") {

                        } else if (role === "WH MANAGER") {

                        } else if (role === "GRN CLERK") {

                        } else if (role === "INVENTORY CLERK") {

                        } else if (role === "AP Clerk") {
                            complete();
                        } else if (role === "FINANCE HOD") {

                        } else if (role === "INTERNAL AUDIT BU") {

                        } else if (role === "FINANCE CLERK HO") {

                        } else if (role === "INTERNAL AUDIT HO") {

                        } else {

                        }


                    });



                    //METHOD WHICH IS CALLED WHEN WE CLICK ON SAVE BUTTON
                    coordination.participate(Constants.CoordTopic.COMMIT, function (context, complete, abort) {



                        var theController = responseself.propsController;


                        var step = responseself.editable.icmWorkItem.stepName;

                        //changes made by nitin

                        if (role === "PO Clerk") {






                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {



                                var standardpo = getCaseProperty(theController, "", "IPS_StandardPONumber", "value");


                                if (standardpo !== null && standardpo !== undefined && standardpo !== "")

                                {

                                    var checkval = confirm("Are you sure you want to submit this case ?");
                                    if (checkval) {

                                        complete();

                                    } else {

                                        abort({silent: true});
                                    }
                                } else {

                                    abort({"message": "Standard PO number cannot be empty!"});

                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To PO Manager") {

                                var checkval = confirm("Are you sure you want to return this case to PO Manager ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "TERMINATE") {
                                complete();


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "RESUBMIT") {

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Save as Draft") {

                                var checkval = confirm("Are you sure you want to save this case data ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Close") {

                                var checkval = confirm("Are you sure you want to close this case?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else {
                                complete();
                            }

                        } else if (role === "PO Manager") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Save as Draft") {

                                var checkval = confirm("Are you sure you want to save this case data ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }

                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Close") {

                                var checkval = confirm("Are you sure you want to close this case?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "GM Spare Parts") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else {
                                complete();
                            }
                        } else if (role === "GM Finance") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else {
                                complete();
                            }
                        } else if (role === "Warehouse Clerk") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit") {
                                var checkval = confirm("Are you sure you want to submit this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }


                            } else {
                                complete();
                            }
                        } else if (role === "Warehouse Manager") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Approve") {
                                var checkval = confirm("Are you sure you want to approve this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To Sender") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Terminate") {
                                var checkval = confirm("Are you sure you want to terminate this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "GRN Clerk") {

                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Fetch GRN") {
                                var checkval = confirm("Are you sure you want to Fetch GRN for this case ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else if (context[Constants.CoordContext.WKITEMRESPONSE] === "Return To WH") {
                                var checkval = confirm("Are you sure you want to return this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }


                        } else if (role === "INVENTORY CLERK") {

                        } else if (role === "AP Clerk") {
                            if (context[Constants.CoordContext.WKITEMRESPONSE] === "Complete Process") {
                                var checkval = confirm("Are you sure you want to complete this case  ?");
                                if (checkval) {

                                    complete();

                                } else {

                                    abort({silent: true});
                                }
                            } else {
                                complete();
                            }
                        } else if (role === "FINANCE HOD") {

                        } else if (role === "INTERNAL AUDIT BU") {

                        } else if (role === "FINANCE CLERK HO") {

                        } else if (role === "INTERNAL AUDIT HO") {

                        } else {
                            complete();
                        }

                    });



                });

                return payload;

            } catch (exception) {
                alert(exception);
            }

        },

        propupdateaction: function (payload, solution, role, scriptAdaptor) {

            var rolename = role.name;
            /*   var responseself = scriptAdaptor;
             responseself.editable = payload.workItemEditable;
             responseself.propsController = ControllerManager.bind(responseself.editable);
             var step=responseself.editable.icmWorkItem.stepName;*/


            var workItemEditable = self.context.model.workItemEditable;
            var propertyCollection = workItemEditable._getPropertiesCollection();


            var theController = ControllerManager.bind(workItemEditable);
            console.log('theController is ' + theController);





            //var theController=scriptAdaptor.propsController;
            /*var myWorkItemEditable = payload.Case;
             var control=ControllerManager.bind(myWorkItemEditable);
             */

            // var step=responseself.editable.icmWorkItem.stepName;

            //     	var theController=responseself.propsController;

            if (rolename === "Branch Checker") {
                propupdateaction.propupdateactionBC(theController, payload, this.solution, this.role, scriptAdaptor);
            } else if (rolename === "Assigner") {
                propupdateaction.propupdateactionAO(theController, payload, this.solution, this.role, scriptAdaptor);
            } else {

            }



        },

        //changes made by nitin for production issue no 4 on 12 March 2018
        rowdeletedaction: function (payload, solution, role, scriptAdaptor) {
            var rolename = role.name;
            var theController = scriptAdaptor.propsController;
            if (rolename === "Branch Scrutiniser" || rolename === "Internal Agent" || rolename === "External Agent" || rolename === "Branch Officer" || rolename === "Sales Officer") {
                propupdateaction.rowdeletion(theController, payload, this.solution, this.role, scriptAdaptor);
            }

        }//changes made by nitin for production issue no 4 on 12 March 2018



    });



    function setCaseProperty(propcontroller, context, propname, settype, setvalue) {
        try {
            if (context === "F_CaseFolder") {
                propcontroller.getPropertyController("F_CaseFolder", propname).set(settype, setvalue);
            } else if (context === "F_CaseTask") {
                propcontroller.getPropertyController("F_CaseTask", propname).set(settype, setvalue);
            } else if (context === "F_WorkflowField") {
                propcontroller.getPropertyController("F_WorkflowField", propname).set(settype, setvalue);
            } else {
                propcontroller.getPropertyController(propname).set(settype, setvalue);
            }
            return true;
        } catch (Error) {
            console.log("Field Update failed -" + propname);
            
            if(propname=="LJ_ReasonforReturning")
            	{
            	console.log("propnofound"+propname);
            	}
            else
            	{
                alert("Source Module: Response Action Adaptor\r\n\r\n" + Error.name + " -" + Error.description + "\r\n" + Error.message + " for -" + propname);

            	}
          
            return false;
        }

    }

    function getCaseProperty(propcontroller, context, propname, gettype) {
        try {
            var caseprop = null;
            if (context === "F_CaseFolder") {
                caseprop = propcontroller.getPropertyController("F_CaseFolder", propname).get(gettype);
            } else if (context === "F_CaseTask") {
                caseprop = propcontroller.getPropertyController("F_CaseTask", propname).get(gettype);
            } else if (context === "F_WorkflowField") {
                caseprop = propcontroller.getPropertyController("F_WorkflowField", propname).get(gettype);
            } else {
                caseprop = propcontroller.getPropertyController(propname).get(gettype);
            }
            return caseprop;
        } catch (Error) {
            console.log("Field Update failed -" + propname);
           // alert("Source Module: Response Action Adaptor\r\n\r\n" + Error.name + " -" + Error.description + "\r\n" + Error.message + " for -" + propname);
            return null;
        }

    }

    function removeResponseButtons(role, editable) {

        var workItem = editable.icmWorkItem;
        var stepname = editable.icmWorkItem.stepName;

        if (role === "Branch Scrutiniser") {


        } else if (role === "Branch Officer") {


        } else if (role === "Sales Officer") {

        } else if (role === "Branch Manager") {

        } else if (role === "Initial Verifier") {

        } else if (role === "Credit Assistant") {

        } else if (role === "Credit Officer") {

        } else if (role === "Credit Approver") {

        } else if (role === "Prime Officer") {

        } else if (role === "Dispatch officer") {

        } else {

        }


    }

    function removeMandatory(theController) {

        var propList = theController.getPropertyControllers("F_CaseFolder");
        for (var i = 0; i < propList.length; i++) {
            propList[i].set("required", false);
        }
        return true;
    }
    
    //new changes
    
    function setupdateCaseStatus(caseStatus,larNumber)
    {
    	console.log("inside setupdateCaseStatus");

    	 var serviceParams = new Object();
         serviceParams.type = "caseStatus";
         serviceParams.LAR =larNumber.trim();
         serviceParams.caseCurrentStatus =caseStatus;
    	Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
            requestParams: serviceParams,
            requestCompleteCallback: function(ResultResponse) {
            console.log("response is setupdateCaseStatus",ResultResponse);	
            }
    	});
    	
    }
    function setupdateReturnedDate(dateType,assignerDate,larNumber)
    {
    	console.log("inside assigner retrun Date");
    	 var serviceParams = new Object();
         serviceParams.type = "AssignerreturnDate";
         serviceParams.LAR =larNumber.trim();
         serviceParams.AssignerDate =convert();
         serviceParams.dateType =dateType;

    	Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
            requestParams: serviceParams,
            requestCompleteCallback: function(ResultResponse) {
            console.log("response is AssignerreturnDate",ResultResponse);	
            }
    	});
    	
    }
    function setupdateCheckrSubmitsTime(submittedTime,larNumber)
    {
    	console.log("inside setupdateCheckrSubmitsTime");

    	 var serviceParams = new Object();
         serviceParams.type = "checkerSubmitedTime";
         serviceParams.LAR =larNumber.trim();
         serviceParams.submittedTime=convert();
    	Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
            requestParams: serviceParams,
            requestCompleteCallback: function(ResultResponse) {
            console.log("response is checkerSubmitedTime",ResultResponse);	
            }
    	});
    	
    }
    function callDBService(serviceParams)
    {
    	console.log("CAll db service",serviceParams);
    	 Request.invokePluginService("DocUpdateMainPluginId", "updateDBService", {
             requestParams: serviceParams,
             requestCompleteCallback: function(ResultResponse) {
             console.log("response is callDBService",ResultResponse);	
             }
     	}); 	
    }
    function convert() {
    	
    	
    		  //var  indexval = str.indexOf("GMT");
    	      //  var dateValue= dateString.substring(0, indexval);
    	        
    	         var date = new Date(), mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    	     	    day = ("0" + date.getDate()).slice(-2);
    	     	 var  hours=date.getHours();
    	     	  var  minutes=date.getMinutes();
    	     	  var secnds=date.getSeconds();
    	     	  var dates= [day, mnth,date.getFullYear()].join("/");
    	     	  var time=[hours, minutes, secnds].join(":");
    	     	  console.log("datetimeminutes--"+dates+" "+time);
    	     	  return dates+" "+time;
    	
      
     	}
    
    ///new changes

});



