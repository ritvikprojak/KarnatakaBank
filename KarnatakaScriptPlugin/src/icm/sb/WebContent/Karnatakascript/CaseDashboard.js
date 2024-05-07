require(["dojo/_base/lang",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, Action,Constants, ControllerManager){
    lang.setObject("dashboardscript", {
        "passthrough": function(payload, solution, role, scriptAdaptor){
            return payload;
        },
		
        
        gettotalInvoiceList:function(payload, solution, role, scriptAdaptor){
        	
         	var role=scriptAdaptor.role;
        	var solution=scriptAdaptor.solution;
            var prefix = solution.getPrefix();
            var params = {};
            var self = scriptAdaptor;
            var userId = ecm.model.desktop.userId;
            params.ObjectStore = solution.getTargetOS().id;
            
            var inputNo="";
            
            // var theController=scriptAdaptor.propsController; 
         //    var theController =ControllerManager.bind(myWorkItemEditable); 
        //    var invoiceNumber= getCaseProperty(theController,"","IPS_Supplier","value");
            

        	
        	var invoiceNumberString="";
        	params.ceQuery = "SELECT t.[DateLastModified],t.[IPS_InvoiceNumber],t.[IPS_Status],t.[IPS_ReferenceNumber],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
           // params.ceQuery +=" t.[IPS_Supplier] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";;
            params.ceQuery +="t.[CmAcmCaseState] = 3 and IPS_Status in ('SI-Ready For Finance','AI-Ready For Finance')";
           
        
            
            params.ceQuery=params.ceQuery.replace("\u00a0"," ");
          //  params.criterions = [criterion1, criterion2];
            params.ceQuery=params.ceQuery;
            params.CaseType = prefix+"_AdvanceInvoice"; /* all case types */
            params.solution = solution;
           

            var searchPayload = new icm.util.SearchPayload();
            searchPayload.setModel(params);
            
           // return searchPayload;

            searchPayload.getSearchPayload(function(payload) {
           
            	
            	var property;
            	var reference=payload.detailsViewProperties[0];
            	payload.detailsViewProperties=[];
            	payload.detailsViewProperties.push[reference];
            	
            	var newdvprops = ["CmAcmCaseIdentifier","IPS_InvoiceNumber","IPS_InvoiceDate","IPS_ReferenceNumber","IPS_Status","IPS_Supplier","DateCreated"];
            	for (var i=0; i<newdvprops.length; i++) {
            		property =  {"displayName": newdvprops[i], "orderable":true,"symbolicName":newdvprops[i],"type":(newdvprops[i].indexOf("Date") < 0 ? "xs:string":"xs:timestamp")};
                	payload.detailsViewProperties.push(property);
            	}
            	 payload.searchTemplate.setClasses([new ecm.model.SearchClass("IPS_AdvanceInvoice",
            			    "IPS_StandardInvoice", "folder", true)]);
            	self.onBroadcastEvent("icm.SearchCases", payload); 
            

            });
        	
        	
         	
        	
        },
        
        getAdvanceInvoiceList: function(payload, solution, role, scriptAdaptor){
    		
        	var role=scriptAdaptor.role;
        	var solution=scriptAdaptor.solution;
            var prefix = solution.getPrefix();
            var params = {};
            var self = scriptAdaptor;
            var userId = ecm.model.desktop.userId;
           
            params.ObjectStore = solution.getTargetOS().id;
            
            var inputNo="";
            
             var theController=scriptAdaptor.propsController; 
             
            var invoiceNumber= getCaseProperty(theController,"","IPS_ExistingAdvanceInvoiceNumbers","value");
            var inv=getCaseProperty(theController,"","IPS_InvoiceNumber","value");
            var value="'" + invoiceNumber.join("','") + "'";
      
  
            
            if(invoiceNumber !== null && invoiceNumber !=="" && invoiceNumber !==undefined){
            	
            	//var value=invoiceNumber.toString();
            	
            	
            //	params.ceQuery = "SELECT t.[DateLastModified],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
            	
            	params.ceQuery = "SELECT t.[CmAcmCaseIdentifier],t.[IPS_InvoiceNumber],t.[IPS_InvoiceDate],t.[IPS_ReferenceNumber],t.[IPS_Status],t.[IPS_Supplier],t.[IPS_GRNNumber],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM IPS_AdvanceInvoice t where ";
            //	params.ceQuery +=" t.[IPS_InvoiceNumber] in ("+invoiceNumber+") and  t.[CmAcmCaseState] <> 3 ";
            
            	
          //  	params.ceQuery +="((((t.[IPS_InvoiceNumber] in ('"+value+"')) and t.[CmAcmCaseState] = 3) ))";
      
            	params.ceQuery +="((((t.[IPS_InvoiceNumber] in ("+value+")) and t.[CmAcmCaseState] = 3) ))";
            
            	

                params.ceQuery=params.ceQuery.replace("\u00a0"," ");
              //  params.criterions = [criterion1, criterion2];
                params.ceQuery=params.ceQuery;
                
              
                params.CaseType = prefix+"_AdvanceInvoice"; /* all case types */
                params.solution = solution;
               

                var searchPayload = new icm.util.SearchPayload();
                searchPayload.setModel(params);
                
               // return searchPayload;

           //     var resultSet = self.widget.ecmContentList.getResultSet();
                
           
              //  var pay=searchPayload.getSearchPayload();
               searchPayload.getSearchPayload(function(payload) {
               
                	
                	var property;
                	var reference=payload.detailsViewProperties[0];
                	payload.detailsViewProperties=[];
                	payload.detailsViewProperties.push[reference];
                	
                	var newdvprops = ["CmAcmCaseIdentifier","IPS_InvoiceNumber","IPS_InvoiceDate","IPS_ReferenceNumber","IPS_Status","IPS_Supplier","DateCreated"];
                	for (var i=0; i<newdvprops.length; i++) {
                	
                		
                		property =  {"displayName": newdvprops[i], "orderable":true,"symbolicName":newdvprops[i],"type":(newdvprops[i].indexOf("Date") < 0 ? "xs:string":"xs:timestamp")};
                    	payload.detailsViewProperties.push(property);
                			
                			}
                	

                  

                	self.onBroadcastEvent("icm.SearchCases", payload); 
                

                });
               
            	
            
            }else{
            	
            	alert("Existing invoice no is null ! The system cannot fetch document for null existing invoice no");
            }},
       
        getStandardInvoiceList: function(payload, solution, role, scriptAdaptor){

    		
        	var role=scriptAdaptor.role;
        	var solution=scriptAdaptor.solution;
            var prefix = solution.getPrefix();
            var params = {};
            var self = scriptAdaptor;
            var userId = ecm.model.desktop.userId;
           
            params.ObjectStore = solution.getTargetOS().id;
            
            var inputNo="";
            
             var theController=scriptAdaptor.propsController; 
             
            var invoiceNumber= getCaseProperty(theController,"","IPS_InvoiceNumber","value");
            if(invoiceNumber !== null && invoiceNumber !==""){
            	
            	var invoiceNumberString="";
            	params.ceQuery = "SELECT t.[DateLastModified],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
                params.ceQuery +=" t.[IPS_InvoiceNumber] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";
               	
            }else{
            	
            
             var invoiceNumber= getCaseProperty(theController,"","IPS_InvoiceNumber","value");
            
            params.ceQuery = "SELECT t.[DateLastModified],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
            params.ceQuery +=" t.[IPS_InvoiceNumber] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";
        	}
            params.ceQuery=params.ceQuery.replace("\u00a0"," ");
          //  params.criterions = [criterion1, criterion2];
            params.ceQuery=params.ceQuery;
            params.CaseType = prefix+"_AdvanceInvoice"; /* all case types */
            params.solution = solution;
           

            var searchPayload = new icm.util.SearchPayload();
            searchPayload.setModel(params);
            
           // return searchPayload;

            searchPayload.getSearchPayload(function(payload) {
           
            	
            	var property;
            	var reference=payload.detailsViewProperties[0];
            	payload.detailsViewProperties=[];
            	payload.detailsViewProperties.push[reference];
            	
            	var newdvprops = ["CmAcmCaseIdentifier","IPS_","IPS_","IPS_","IPS'/_","IPS_","IPS_","IPS_"];
            	for (var i=0; i<newdvprops.length; i++) {
            		property =  {"displayName": newdvprops[i], "orderable":true,"symbolicName":newdvprops[i],"type":(newdvprops[i].indexOf("Date") < 0 ? "xs:string":"xs:timestamp")};
                	payload.detailsViewProperties.push(property);
            	}
            	
            	self.onBroadcastEvent("icm.SearchCases", payload); 
            

            });
        	
        	
        
        },
        
        getStandardAdvanceInvoiceList: function(payload, solution, role, scriptAdaptor){

    		
        	var role=scriptAdaptor.role;
        	var solution=scriptAdaptor.solution;
            var prefix = solution.getPrefix();
            var params = {};
            var self = scriptAdaptor;
            var userId = ecm.model.desktop.userId;
           
            params.ObjectStore = solution.getTargetOS().id;
            
            var inputNo="";
            
             var theController=scriptAdaptor.propsController; 
             
            var invoiceNumber= getCaseProperty(theController,"","IPS_InvoiceNumber","value");
            if(invoiceNumber !== null && invoiceNumber !==""){
            	
            	var invoiceNumberString="";
            	params.ceQuery = "SELECT t.[DateLastModified],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
                params.ceQuery +=" t.[IPS_InvoiceNumber] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";
               	
            }else{
            	
            
             var invoiceNumber= getCaseProperty(theController,"","IPS_InvoiceNumber","value");
            
            params.ceQuery = "SELECT t.[DateLastModified],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
            params.ceQuery +=" t.[IPS_InvoiceNumber] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";
        	}
            params.ceQuery=params.ceQuery.replace("\u00a0"," ");
          //  params.criterions = [criterion1, criterion2];
            params.ceQuery=params.ceQuery;
            params.CaseType = prefix+"_AdvanceInvoice"; /* all case types */
            params.solution = solution;
           

            var searchPayload = new icm.util.SearchPayload();
            searchPayload.setModel(params);
            
           // return searchPayload;

            searchPayload.getSearchPayload(function(payload) {
           
            	
            	var property;
            	var reference=payload.detailsViewProperties[0];
            	payload.detailsViewProperties=[];
            	payload.detailsViewProperties.push[reference];
            	
            	var newdvprops = ["CmAcmCaseIdentifier","IPS_","IPS_","IPS_","IPS_","IPS_","IPS_","IPS_"];
            	for (var i=0; i<newdvprops.length; i++) {
            		property =  {"displayName": newdvprops[i], "orderable":true,"symbolicName":newdvprops[i],"type":(newdvprops[i].indexOf("Date") < 0 ? "xs:string":"xs:timestamp")};
                	payload.detailsViewProperties.push(property);
            	}
            	
                payload.searchTemplate.setClasses([new ecm.model.SearchClass("IPS_StandardInvoice",
         			     "folder", true)]);


            	self.onBroadcastEvent("icm.SearchCases", payload); 
            

            });
        	
        	
        
        	
        },
        
        getAllInvoiceList: function(payload, solution, role, scriptAdaptor){

        	
        	
        	
        	
        	
        	
        	//
        	


			  var serviceName="getCaseMetadata";
			   var servicetype="GET";
			   var handler="json";
			   var parameterNames=["suppplier"];
			//   var value =payload.change.value;
			   var myWorkItemEditable = payload.Case;
			   var theController =ControllerManager.bind(myWorkItemEditable); 
			   var value=getCaseProperty(theController,"","IPS_SupplierCode","value");
			   var parameterValues=[value];
			   parameterValues.push(parameterValues);
			 
				   filterData= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);
				   var varn=getCaseProperty(theController,"","IPS_StandardInvoiceNumberMulti","value");
				   
				   if(filterData !== undefined )
				 
					 /*  var var1=getCaseProperty(theController,"","IPS_StandardInvoiceNumberMulti","value");
				   var var2=getCaseProperty(theController,"","IPS_InvoiceDateMulti","value");
				   var var3=getCaseProperty(theController,"","IPS_InvoiceAmountMulti","value");
				   var var4=getCaseProperty(theController,"","IPS_InvoiceCurrencyMulti","value");
				  
				   var var6=getCaseProperty(theController,"","IPS_InvoiceTypeMulti","value");
				   var var7=getCaseProperty(theController,"","IPS_ReferenceNumberMulti","value");
					   
					   
				   
				   if(var1.length>0)
					   {
					   var1.push("");
					   var2.push("");
					   var3.push("");
					   var4.push("");
					   var6.push("");
					   var7.push("");
					   
					   }
				   */
				   
				   
				   
				   
				   
				  
				   
					   var var1=[];
				   var var2=[];
				   var var3=[];
				   var var4=[];
				   var var5=[];
				   var var6=[];
				   var var7=[];
				   
					   if(filterData !=null ){
				
			
					  
					   for(var i=0;i<filterData.length;i++)
						   {
						 var1.push(filterData[i].IPS_InvoiceNumber);
						 
						 if(filterData[i].IPS_InvoiceDate !==null && filterData[i].IPS_InvoiceDate !==undefined &&filterData[i].IPS_InvoiceDate !==""){
								var modifiedDate=new Date(filterData[i].IPS_InvoiceDate.time);
								 var2.push(modifiedDate);
							 }
							
						 var3.push(filterData[i].IPS_TotalInvoiceAmount);
						 var4.push(filterData[i].IPS_InvoiceCurrency);
						 var6.push(filterData[i].IPS_InvoiceType);
					     var7.push(filterData[i].IPS_ReferenceNumber);
						   }
                         
					  
					   
					   
					   
					   
					   setCaseProperty(theController,"","IPS_StandardInvoiceNumberMulti","value",var1);
					//   setCaseProperty(theController,"","IPS_InvoiceDateMulti","value",var2);
					
					   setCaseProperty(theController,"","IPS_InvoiceAmountMulti","value",var3);
					   setCaseProperty(theController,"","IPS_InvoiceCurrencyMulti","value",var4);
					//   setCaseProperty(theController,"","IPS_InvoiceDescriptionMulti","value",var5);
					   setCaseProperty(theController,"","IPS_InvoiceTypeMulti","value",var6);
					   setCaseProperty(theController,"","IPS_ReferenceNumberMulti","value",var7);
					   setCaseProperty(theController,"","IPS_InvoiceDateMulti","value",var2);
										  
						   
				   		}  


			
        	
        	
        	//
        	
        	
        	
    		
        	var role=scriptAdaptor.role;
        	var solution=scriptAdaptor.solution;
            var prefix = solution.getPrefix();
            var params = {};
            var self = scriptAdaptor;
            var userId = ecm.model.desktop.userId;
        	var myWorkItemEditable = payload.Case;
            params.ObjectStore = solution.getTargetOS().id;
            
            var inputNo="";
            
            // var theController=scriptAdaptor.propsController; 
             var theController =ControllerManager.bind(myWorkItemEditable); 
               var supplierCode= getCaseProperty(theController,"","IPS_SupplierCode","value");
          //   var invoiceNumber="PRECISE EQUIPMENTS PRIVATE LTD.";
           
            if(supplierCode !== null && supplierCode !==""){
            	
            	var invoiceNumberString="";
            	params.ceQuery = "SELECT t.[DateLastModified],t.[IPS_ReferenceNumber],t.[IPS_InvoiceType],t.[IPS_InvoiceNumber],t.[IPS_InvoiceDate],t.[IPS_Status],t.[IPS_TotalInvoiceAmount],t.[IPS_InvoiceCurrency],t.[IPS_SupplierName],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
               // params.ceQuery +=" t.[IPS_Supplier] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";;
                params.ceQuery +="((((t.[IPS_SupplierCode] = '"+supplierCode+"') and t.[IPS_Status] in ('AI-Ready For Finance','SI-Ready For Finance')) ))";
               
            }else{
            	
            	alert("Please enter the supplier code befor processing !");
            }
            params.ceQuery=params.ceQuery.replace("\u00a0"," ");
          //  params.criterions = [criterion1, criterion2];
            params.ceQuery=params.ceQuery;
            params.CaseType = prefix+"_AdvanceInvoice"; /* all case types */
            params.solution = solution;
           

            var searchPayload = new icm.util.SearchPayload();
            searchPayload.setModel(params);
            
           // return searchPayload;

            searchPayload.getSearchPayload(function(payload) {
           
            	
            	var property;
            	var reference=payload.detailsViewProperties[0];
            	payload.detailsViewProperties=[];
            	payload.detailsViewProperties.push[reference];
            	
            	var newdvprops = ["CmAcmCaseIdentifier","IPS_ReferenceNumber","IPS_InvoiceNumber","IPS_SupplierName","IPS_InvoiceType","IPS_TotalInvoiceAmount","IPS_InvoiceCurrency","IPS_Status","DateCreated"];
            	for (var i=0; i<newdvprops.length; i++) {
            		property =  {"displayName": newdvprops[i], "orderable":true,"symbolicName":newdvprops[i],"type":(newdvprops[i].indexOf("Date") < 0 ? "xs:string":"xs:timestamp")};
                	payload.detailsViewProperties.push(property);
            	}
            	 payload.searchTemplate.setClasses([new ecm.model.SearchClass("IPS_AdvanceInvoice",
            			    "IPS_StandardInvoice", "folder", true)]);
            	self.onBroadcastEvent("icm.SearchCases", payload); 
            	
            	
            	
            	
            	

            });
        	
        	
        
        	
        },
        
        
        
        getinvoiceListforFinance: function(payload, solution, role, scriptAdaptor){

        	
        	var role=scriptAdaptor.role;
        	var solution=scriptAdaptor.solution;
            var prefix = solution.getPrefix();
            var params = {};
            var self = scriptAdaptor;
            var userId = ecm.model.desktop.userId;
           
            params.ObjectStore = solution.getTargetOS().id;
            
            var inputNo="";
            
            
            var theController=scriptAdaptor.propsController; 
            
            var invoiceNumber= getCaseProperty(theController,"","IPS_ReferenceNumberMulti","value");
           
            var value="'" + invoiceNumber.join("','") + "'";
        
            
          
          
            if(value !== null && value !==""){
            	
            	var invoiceNumberString="";
            	params.ceQuery = "SELECT t.[DateLastModified],t.[IPS_ReferenceNumber],t.[IPS_InvoiceType],t.[IPS_InvoiceNumber],t.[IPS_InvoiceDate],t.[IPS_Status],t.[IPS_TotalInvoiceAmount],t.[IPS_InvoiceCurrency],t.[IPS_SupplierName],t.[CmAcmCaseIdentifier],t.[CmAcmCaseState],t.[FolderName],t.[LastModifier],t.[ClassDescription],t.[DateCreated] FROM [CmAcmCaseFolder] t where ";
               // params.ceQuery +=" t.[IPS_Supplier] in "+invoiceNumberString+" and  t.[CmAcmCaseState] <> 3 ";;
                params.ceQuery +="((((t.[IPS_ReferenceNumber] in ("+value+"))) ))";
               
            alert(params.ceQuery);
            }else{
            	
            	alert("No data available for this supplier");
            }
            params.ceQuery=params.ceQuery.replace("\u00a0"," ");
          //  params.criterions = [criterion1, criterion2];
            params.ceQuery=params.ceQuery;
            params.CaseType = prefix+"_AdvanceInvoice";  
            params.solution = solution;
           

            var searchPayload = new icm.util.SearchPayload();
            searchPayload.setModel(params);
            
           // return searchPayload;

            searchPayload.getSearchPayload(function(payload) {
           
            	
            	var property;
            	var reference=payload.detailsViewProperties[0];
            	payload.detailsViewProperties=[];
            	payload.detailsViewProperties.push[reference];
            	
            	var newdvprops = ["CmAcmCaseIdentifier","IPS_ReferenceNumber","IPS_InvoiceNumber","IPS_SupplierName","IPS_InvoiceType","IPS_TotalInvoiceAmount","IPS_InvoiceCurrency","IPS_Status","DateCreated"];
            	for (var i=0; i<newdvprops.length; i++) {
            		property =  {"displayName": newdvprops[i], "orderable":true,"symbolicName":newdvprops[i],"type":(newdvprops[i].indexOf("Date") < 0 ? "xs:string":"xs:timestamp")};
                	payload.detailsViewProperties.push(property);
            	}
            	 payload.searchTemplate.setClasses([new ecm.model.SearchClass("IPS_AdvanceInvoice",
            			    "IPS_StandardInvoice", "folder", true)]);
            	self.onBroadcastEvent("icm.SearchCases", payload); 
            	
            	
            	
            	
            	

            });
        	
        	
        
        	
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
    		console.log("Field Update failed -"+propname);
	        alert ("Source Module: Response Action Adaptor\r\n\r\n"+Error.name+" -"+Error.description+"\r\n"+Error.message+" for -"+propname);
	    return null;
	}
    	
   }
    
});


