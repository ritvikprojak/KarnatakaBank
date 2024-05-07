require(["dojo/_base/lang",

   "dijit/ConfirmDialog","ecm/model/SearchCriterion","Karnatakascript/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, ConfirmDialog, Criterion,Constants, ControllerManager){

    lang.setObject("addcasescript", {

        "passthrough": function(payload, solution, role, scriptAdaptor){

            return payload;

        },

       

       addCaseCriteria: function(payload, solution, role, scriptAdaptor){

        var coord = payload.coordination;

        var page="";

        if(payload.caseEditable != undefined){

           caseEdit=payload.caseEditable;
           console.log("addcase,",caseEdit);
           //_self.addcasescript.caseEdit=payload.caseEditable;
           page="addCase";

       }else if(payload.workItemEditable){

           caseEdit=payload.workItemEditable;
           console.log("work,",caseEdit);
          // _self.addcasescript.caseEdit=payload.caseEditable;

           page="workDetail";

       }

           

       var prefix = solution.getPrefix();

       var user = ecm.model.desktop.userId;

var userId = user.toUpperCase();
       var self =scriptAdaptor;
console.log("self1self",self)
       var role= role.name;

       

       

       require(["Karnatakascript/Constants", "dijit/ConfirmDialog", "icm/model/properties/controller/ControllerManager"], function(Constants, ConfirmDialog, ControllerManager){

           

           if(coord){

               

               coord.participate(Constants.CoordTopic.BEFORELOADWIDGET,function(context, complete, abort){

                   

                   var theController  = ControllerManager.bind(caseEdit);

                   self.controller = theController;

                   self.propsController=theController;
                   console.log("self.controller1,",self.controller);

                   

                   if(page ==="addCase"){

                       console.log("addcase,",caseEdit);
     
                       var caseType= "LJ_LoanJourneyCasetype";
                  var serviceName="/loan/ldap/solId/?userId=";

                      var servicetype="GET";

                      var handler="json";

                      var parameterNames=["userId"];

                      var value =userId.toUpperCase();

			

                     

                    //  var value1=getCaseProperty(theController,"",LAR,"value");

                      var parameterValues=[value];

               //  parameterValues.push(parameterValues);

                    

                          filterData= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);

                        

                        

                          if(filterData !==null && filterData !== undefined  ){

                        

                                  }else{

                     
                                      

                                  }

                            

							           var serviceName="/laps/userId/?userId=";

                      var servicetype="GET";

                      var handler="json";

                      var parameterNames=["SOL"];

                      var value =userId;

                     

                    //  var value1=getCaseProperty(theController,"",LAR,"value");

                      var parameterValues=[value];

               //  parameterValues.push(parameterValues);

                    

                          filterData= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);

                        

                        

                          if(filterData !==null && filterData !== undefined  ){

                                                                                

                                 setCaseProperty(theController,"","LJ_UserClassPower","value", filterData.data.user_details.user_classpower);
								 setCaseProperty(theController,"","LJ_SOL_ID","value", filterData.data.user_details.user_solid);

                                                                                              

                                  }else{

                               

                                      setCaseProperty(theController,"","LJ_UserClassPower","value","");

                                                                                                                 

                                      console.log("No classpower available  in the database!");

                                      

                                  }

			
                           }


       complete(); 

               });

               

               coord.participate(Constants.CoordTopic.BEFORESAVE, function(context,complete,abort){

                   if(context[Constants.CoordContext.CASE] ){

                                   

                           var val=1;

                       

                       var addCommentDialog = new ConfirmDialog({

                           content: "Are you sure you want to create case ?",

                           buttonCancel: "Label of cancel button",

                           buttonOk: "Label of OK button",

                         style: "width: 300px; height: 150px",

                         onCancel : function() {

                               

                         if(val)

                            {

                           

                               abort({silent:true});

                            }else{

                               

                                complete();

                            }  

                         addCommentDialog.destroy();   

                         // ConfirmDialog.prototype.onClickClose.apply(this,arguments);

                               // abort({'silent':true});

                            },

                        onExecute: function(){

                            

                            var theController = ControllerManager.bind(caseEdit);      

                              var referenceProp = theController.getPropertyController("LJ_ReferenceNumber");

                              var referenceNumber= "";

                              

                              
                              var value=getCaseProperty(theController,"","LJ_LARNumber","value");

                              var value1=getCaseProperty(theController,"","LJ_CustomerId","value");

                              referenceNumber=value+"_"+value1;

                             setCaseProperty(theController,"","LJ_ReferenceNumber","value",referenceNumber);

                               setCaseProperty(theController,"","LJ_CreatedBy","value",userId);

                              

                                   var messageDialog = new ecm.widget.dialog.MessageDialog({text: "<b>Loan Journey Case Registered Successfully</b>- Please refer unique Reference Number : <font size='3' color='orange'> "+referenceNumber+"<font>"});

                                   messageDialog.show();

                                   ControllerManager.unbind(caseEdit); 

                                   complete();

                            

                           }

                        });

                       //

                       addCommentDialog.show();
        

               }});

               

               

               //code for submit button not working in beforesave therefore created aftersave still it s not working!

               coord.participate(Constants.CoordTopic.AFTERSAVE, function(context, complete, abort) {

               

                   if (context[Constants.CoordContext.WKITEMRESPONSE] === "Submit"){

                          var checkval = confirm("Are you sure you want to submit this case ?");

                               if(checkval){

                               

                               complete();

                               

                               }

                               else{

                                   

                               abort({silent:true});

                               }     

                   }});

           }   





       if (payload.eventName === "icm.FieldUpdated"){

    	   
    	 
    		   
         /*  if(self.controller)
        	   {
        	   console.log("payload exist");
        	   }
           else
        	   {
        	   console.log("payload not found");

        	   var theController  = ControllerManager.bind(_self.addcasescript.caseEdit);

               self.controller = theController;

               self.propsController=theController;
        	   }*/
           console.log("self.controller1,",self.controller);

           var changedProperty = payload.change.id;

           var changedPropertyValue = payload.change.value;
		   var theController = self.controller;

	           console.log("self.controller2 update,",self.controller);
	           console.log("self1self",self)


               var LAR="LJ_LARNumber";

      
   if (changedProperty === LAR){
       console.log("changedProperty",changedProperty);


   var caseType= "LJ_LoanJourneyCasetype";

               if(payload.change.value !==null && payload.change.value !==undefined && payload.change.value !==""){

                     var serviceName="/loan/laps/lar/?larNumber=";

                      var servicetype="GET";

                      var handler="json";

                      var parameterNames=["larNumber"];

                      var value =payload.change.value;	 

			var validation = addcasescript.LARValidation(value);

				var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(validation ,"text/xml");
    var count = xmlDoc.getElementsByTagName("cmisra:numItems")[0].childNodes[0].nodeValue;
					 
				// console.log(count);	 



                   if(count === '0'){

                    //  var value1=getCaseProperty(theController,"",LAR,"value");

                      var parameterValues=[value];

               //  parameterValues.push(parameterValues);
					
						filterData= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);

      

                        

                          if(filterData !==null && filterData !== undefined  ){
                           var digirefNo=filterData.data.InwardDetails.DigiProposalNo;
   					       console.log("filterData",digirefNo);

                           if(filterData.data.InwardDetails.DigiProposalNo)
                                              	       {
                              					     var myDialog = new ecm.widget.dialog.MessageDialog({
                            							text : "This record already exists in Digi Loan with Reference no. "+digirefNo,
                            						    });
                            						    myDialog.show();   
                                              	        }
                           else
                        	   {

                                 setCaseProperty(theController,"","LJ_MobileNumber","value",filterData.data.InwardDetails.MobileNo);

                                 setCaseProperty(theController,"","LJ_PANNumber","value",filterData.data.InwardDetails.PanNo);

                                 setCaseProperty(theController,"","LJ_CustomerName","value",filterData.data.InwardDetails.CustomerName);

                                 setCaseProperty(theController,"","LJ_CustomerId","value",filterData.data.InwardDetails.CbsCustId);

                                 setCaseProperty(theController,"","LJ_BranchCode","value",filterData.data.InwardDetails.OrganisationCode);

								 setCaseProperty(theController,"","LJ_LoanStatus","value",filterData.data.InwardDetails.AppStatus);

                        	   }

                                  }else{

                               

                                      setCaseProperty(theController,"","LJ_MobileNumber","value","");

                                         setCaseProperty(theController,"","LJ_PANNumber","value","");

                                        setCaseProperty(theController,"","LJ_CustomerName","value","");

                                        setCaseProperty(theController,"","LJ_CustomerId","value","");

                                        setCaseProperty(theController,"","LJ_BranchCode","value","");

										setCaseProperty(theController,"","LJ_LoanStatus","value","");

										

										var myDialog = new ecm.widget.dialog.MessageDialog({
											text : "No data available for selected LAR number in the database!",
										    });
										    myDialog.show();  

                                     // console.log("No data available for selected LAR number in the database!");
                   }
					
					}else{
						var myDialog = new ecm.widget.dialog.MessageDialog({
							text : "Case With the LAR available. Kindly try with another LAR",
						    });
						    myDialog.show();   
					
					}

        

  }

                     }

      
           

       }

       });

       },

        

       

       getRestCall: function (serviceName,handler,servicetype,parameterNames,parameterValues){

           

           var filterData= ""; 

           try{

           var serverBase = window.location.protocol + "\/\/" + window.location.host;

           var parameters="";      

           for(var i=0;i<parameterNames.length;i++){           

               if(i === 0){

                   parameters=parameterValues[0];

               }else{

                   parameters=parameterValues[0] +"/" + parameterValues[1];

               }

               

           }

           

           //for localhost 

		   if (serviceName ==="/loan/ldap/solId/?userId=")

		   {

		   var serverBase=window.location.origin + serviceName + parameters;

		   }



		   else if (serviceName ==="/loan/laps/lar/?larNumber="){


		   var serverBase= window.location.origin +serviceName + parameters;

		   }

		   else if (serviceName ==="/laps/userId/?userId="){

		   var serverBase=window.location.origin+"/loan" +serviceName+ parameters;

		   }
		else if (serviceName ==="/laps/userROId/?userId="){

		   var serverBase=window.location.origin+"/loan" +serviceName+ parameters;

		   }else if (serviceName ="/loan1/laps/getBranches/?solId="){
	
		var serverBase=window.location.origin+serviceName+parameters;
	
		}
		   else {

           var serverBase=window.location.origin+"/loan" +serviceName+ "/"+parameters;

		   }

       

   var feedURL = serverBase ;

   //"/fetchDetails/{larNumber}"

           var userData = "";

           

           

           var xhrArgs = {            

                   url: feedURL,                        

                   handleAs: handler,

                   sync: true,

                   preventCache: true,

                   headers: { "Content-Type": "application/json",

                   "Access-Control-Allow-Origin":"*"},            

                   load: function(data){    

                       filterData = data;

                   } ,            

                   error: function(error)            

                   {            

                       console.log ("External services query failed due to " + error);    

   

                   }            



           };

           if(servicetype === "GET"){

               dojo.xhrGet(xhrArgs);

           }else{

               dojo.xhrPost(xhrArgs);  

           }

           } catch (Error) {

               console.log ("Source Module: "+ ScriptAdaptorScope.arguments.label +" Script Adaptor -setDefaultValue Function\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);

           }

           /*if(filterData instanceof ){

               return filterData;

           }else if(filterData instanceof ){

               var response="filterData."+serviceName;

               

               return JSON.parse(response);;

           }*/

           

           return filterData;

       },

		LARValidation : function(larNumber){
		
		
		
			var filterData;
		
			var feedURL = window.location.origin + "/fncmis/resources/CMTOS/query?q=Select LJ_LARNumber from LJ_LoanJourneyCaseType where LJ_LARNumber='"+larNumber+"'";
			
			try{
			
           var xhrArgs = {            

                   url: feedURL,                        

                   sync: true,

                   preventCache: true,

                   headers: {

                   "Access-Control-Allow-Origin":"*"},            

                   load: function(data){    

                       filterData = data;

                   } ,            

                   error: function(error)            

                   {            

                       console.log ("External services query failed due to " + error);    

   

                   }            



           };
               dojo.xhrGet(xhrArgs);


           } catch (Error) {

               console.log ("Source Module: "+ ScriptAdaptorScope.arguments.label +" Script Adaptor -setDefaultValue Function\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);

           }
		   
		   return filterData;
		},

        

        uploaddocuments: function(payload, solution, role, scriptAdaptor){

        

           try {

               var ScriptAdaptorScope = scriptAdaptor;

           

               var entryTemplateId="{7FDC730E-B204-C38B-87F9-75F9EC200000}";

               

               //var entryTemplateId = "{80725C5E-0000-C91E-8747-3BB9591FCDA5}";

               var repositoryId = payload.Case.repository.repositoryId;

               var myWorkItemEditable = payload.Case;

               var self=scriptAdaptor;







               if(payload.Case.caseObject !== null && payload.Case.caseObject !== undefined){



               var caseFolder = "{"+payload.Case.caseObject.id+"}";

               require([

               "dojo/_base/declare",

               "dojo/_base/lang",
			   "dojo/aspect",

               "ecm/widget/dialog/AddContentItemDialog"

               ], function(

               declare,

               lang,
			   aspect,

               AddContentItemDialog

               )

               {



               var repository = ecm.model.desktop.getRepository(repositoryId);



               repository.retrieveItem(entryTemplateId, function(item) {



               if (item && item.mimetype) {

               switch (item.mimetype) {

               case "application/x-icn-documententrytemplate":

               case "application/x-filenet-documententrytemplate":

               case "application/x-filenet-folderentrytemplate":

               case "application/x-filenet-entrytemplate":

               case "application/x-filenet-customobjectentrytemplate":

               case "application/x-filenet-declarerecordentrytemplate":



               var entryTemplate = repository.getEntryTemplateById(item.id,

               item.name, item.objectStore);



               var entryTemplateRetrievedHandler = lang.hitch(this,

               function(entryTemplate) {



               var myDialog = new AddContentItemDialog();
			   
			       aspect.before(myDialog, "onAdd", lang.hitch(this, function advisor(original) 
	        {
			debugger;
		
			if(!myDialog.isValid(true))

            {
				console.log("inside if loop");
				alert("Error : (1) Check document is selected for upload.(2) Check all the mandatory properties are present. (3) Contact System Administrator if the issue is not resolved from above points.");

			}
			else
			{
				console.log("Document Uploading");
			}

            }));
			   

               if (entryTemplate) {

                   

                   

                   var lar_Number = "LJ_LARNumber";

                   var proposal_number = "LJ_ProposalNumber";

                   var kind = "LJ_Kind";
				                      var customername="LJ_CustomerName";

                   var branchcode="LJ_BranchCode";

                   var referencenumber1="LJ_ReferenceNumber";

                                      

            

     

        



               require(["icm/model/properties/controller/ControllerManager"], function(ControllerManager){



            var theController =ControllerManager.bind(myWorkItemEditable);

           

               

               var larNumber=theController.getPropertyController(lar_Number).get("value"); 

               var proposalnumber=theController.getPropertyController(proposal_number).get("value"); 

               var kind1=theController.getPropertyController(kind).get("value");

               var customerName= theController.getPropertyController(customername).get("value");

			   var referenceNumber= theController.getPropertyController(referencenumber1).get("value");
			   
			   var Branchcode= theController.getPropertyController(branchcode).get("value");
			   
			   

           

               //var documentSubType=theController.getPropertyController(documentSubTypeProp).get("value"); 

               //var documentSubTypeChoices=theController.getPropertyController(documentSubTypeProp).get("choices"); 

               //var documentType=theController.getPropertyController(documentTypeProp).get("value"); 

               //var accountNo=theController.getPropertyController(accountNoProp).get("value"); 

               //var nicNo=theController.getPropertyController(nicNoProp).get("value"); 

               //var referenceNo=theController.getPropertyController(referenceNoProp).get("value"); 

               

               setDefaultValue(entryTemplate,lar_Number,larNumber, false);

               setDefaultValue(entryTemplate,proposal_number,proposalnumber, false);

               setDefaultValue(entryTemplate,kind,kind1, false);

			   setDefaultValue(entryTemplate,customername,customerName, false);

			   setDefaultValue(entryTemplate,referencenumber1,referenceNumber, false);
			   
			    
                setDefaultValue(entryTemplate,branchcode,Branchcode, false);
			   

			   

               

               setCaseProperty(theController,"",lar_Number,"readOnly",true);

                setCaseProperty(theController,"",proposal_number,"readOnly",false);

                setCaseProperty(theController,"",kind,"readOnly",false);

                

             ControllerManager.unbind(myWorkItemEditable);



               

               

               



               



               

               var folder = entryTemplate.folder;

               if (folder && !folder.hasPrivilege("privAddToFolder")

               && !entryTemplate.allowUserSelectFolder) {

               var message =

               ecm.model.Message.createErrorMessage("entry_template_folder_restricted_error", [

               entryTemplate.name,

               folder.name

               ]);

               if (message) {

               ecm.model.desktop.addMessage(message);

               }

               } else {

               myDialog.show(

               repository,

               caseFolder,

               (entryTemplate.type ==

               ecm.model.EntryTemplate.TYPE.DOCUMENT),

               false,

               function(newItem) {

                   try {

                       console.log("new Item");

                       console.log(newItem);

                       var vsId = [];

                       var tempId = newItem.id;

                       if(self.vsId){

                           self.vsId.push({"VersionSeries":newItem.vsId});

                           

                       }else{

                           vsId.push({"VersionSeries":newItem.vsId});

                           self.vsId=vsId;

                       }

                      

                       try {

                           /*Add new content item / document to

                           the current case root/sub folder*/

                           var currentFolder="";

                           if(payload.NewCase !== undefined ){

                               currentFolder = payload.NewCase.caseObject.caseFolder;

                           }else{

                               currentFolder = payload.CurrentFolder;

                           }

                           

                           currentFolder.addToFolder(newItem,

                           function() {

                           console.log('Document added to Case folder');

                           });

                           } catch (

                           Error) {

                           alert ("Oops! Error in callback");

                           }

                       

                    listDocumentPayload = {

                               "objectStoreNames" : [payload.Case.repository.objectStoreName],

                               "symbolicNames": ["Creator", "LJ_LARNumber","LJ_ReferenceNumber","LJ_DocumentCode","LJ_CustomerName","LJ_BranchCode"],

                               "values": self.vsId,

                               "externalColumns": [{"symbolicName": "Creator", "name": "Creator"}]

                           };

                       

                       

                       /*

                       listDocumentPayload = {

                               "objectStoreNames" : [payload.Case.repository.objectStoreName],

                               "symbolicNames": ["Creator", "DMS_DocumentType", "DMS_DocumentSubType"],

                               "values": self.vsId,

                               "externalColumns": [{"symbolicName": "Creator", "name": "Creator"}]

                           };*/

                       self.onPublishEvent("icm.sendEventPayload",listDocumentPayload);



                       console.log("listDocumentPayload");

                       console.log(listDocumentPayload);

                       return listDocumentPayload;



                   } catch (

                   Error) {



                       var messageDialog = new ecm.widget.dialog.MessageDialog({

                           text: "Oops! Error in callback !!"

                       });

                       messageDialog.show();

                   }

               },

               null,

               true,

               entryTemplate);

               }

               });

               }

               });

               if (!entryTemplate.isRetrieved) {

               entryTemplate.retrieveEntryTemplate(entryTemplateRetrievedHandler, false, false);

               } else {

               entryTemplateRetrievedHandler(entryTemplate);

               } break;

               }

               }

               },

               "EntryTemplate",

               "current",

               entryTemplateId);

               });

               }else{

                   alert("Please Register Case and then upload documents");        

               }



               } catch (

               Error) {

               console.log ("Source Module: "+ ScriptAdaptorScope.arguments.label +" ScriptAdaptor\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);

               }

               function setDefaultValue (entryTemp,propIdName,propDefaultValue,makeReadOnly) {

               try {

               var i;

               var len;

               if (entryTemp) {

               len = entryTemp.propertiesOptions.length;

               for(i=0; i<len; i++) {

               if (entryTemp.propertiesOptions[i].id == propIdName) {

               entryTemp.propertiesOptions[i].defaultValue = [propDefaultValue];

               if (makeReadOnly) {

               /* Make the field read only */

               entryTemp.propertiesOptions[i].readOnly = true;

               } break;

               }

               }

               }

               } catch (

               Error) {

               console.log ("Source Module: "+ ScriptAdaptorScope.arguments.label +" Script Adaptor -setDefaultValue Function\r\n\r\n"+Error.name+" - "+Error.description+"\r\n"+Error.message);

               }

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

               console.log ("Source Module: Response Action Adaptor\r\n\r\n"+Error.name+" -"+Error.description+"\r\n"+Error.message+"-"+propname);

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

               console.log ("Source Module: Response Action Adaptor\r\n\r\n"+Error.name+" -"+Error.description+"\r\n"+Error.message+"-"+propname);

           return null;

       }

           

      }

       

   

});


		   
