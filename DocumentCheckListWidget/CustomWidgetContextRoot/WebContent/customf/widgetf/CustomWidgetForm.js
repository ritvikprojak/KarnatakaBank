define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom","dojo/on",
        "dijit/registry",
        "dojo/json",       
        "dijit/_TemplatedMixin",
        "icm/base/_BaseWidget",
        "icm/base/BasePageWidget",
        "ecm/widget/dialog/BaseDialog",
        "ecm/widget/dialog/MessageDialog",
        "icm/base/Constants",
        "icm/model/properties/controller/ControllerManager", 
        "ecm/model/Request",
        "ecm/model/Desktop",
        "dojo/Deferred",
        "icm/model/CaseEditable",
        "dijit/Dialog",
        "dijit/form/SimpleTextarea",
        "dijit/form/Button",
        "ecm/widget/dialog/ConfirmationDialog",
        "idx/form/_DateTimeTextBox",
        "dojo", "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore",
        "dojo/data/ObjectStore",
        "customf/widgetf/DocumentDailog",
        "dojo/store/Memory",
        "dijit/layout/ContentPane",
        "dojox/grid/EnhancedGrid",   
        "dojox/grid/enhanced/plugins/Pagination",
        "dojo/text!./templates/CustomWidgetForm.html"],
        
        function(declare,lang,dom,on,registry,json, _TemplatedMixin, _BaseWidget, BasePageWidget,BaseDialog,MessageDialog,
                Constants,ControllerManager,Request,Desktop,Deferred,CaseEditable,Dialog,SimpleTextarea,Button,ConfirmationDialog,
                _DateTimeTextBox,Dojo,DataGrid,ItemFileWriteStore,ObjectStore,DocumentDailog,Memory,ContentPane,EnhancedGrid,Pagination,template){
              window.onerror = function(){return true;};//code to disable java script error in IE8  
            
             
        return declare("customf.widgetf.CustomWidgetForm",[BaseDialog], {
        	
        contentString: template,
        resizable: true,
        widgetsInTemplate: true,
        newCaseType: null,
        lookupResultGrid:null,
        thisInstance: null,
        prodctValue:null,
        docdailog:null,
        doccheckListCount:null,
        docUpdateEvent:null,

         _self:this,
        postCreate:function(){
       this.inherited(arguments);
       this.thisInstance = this;
    },
    handleICM_SendNewCaseInfoEvent: function(payload) {
        
        this.newCaseType = payload.caseEditable;
        
		  this.docdailog=new DocumentDailog();
		  this.doccheckListCount='NEW';
		  
        this.thisInstance = this;
        payload.coordination.participate(
                Constants.CoordTopic.VALIDATE,
                
                lang.hitch(this, 'handleValidation')
        );
    
         
        },
        show: function(sendNewCaseInfoPayload) {
           
            this.inherited(arguments);
           
        },
        openDocListDailog: function()
        {
        	if(this.prodctValue)
        		{
        		
        		console.log("this.doccheckListCountbefore",this.doccheckListCount);
        		this.doccheckListCount=this.docdailog.getDocListCount();
        		console.log("_self.docdailog.getDocListCount()after",this.doccheckListCount)
        			 if(this.doccheckListCount<1)
                	 {
                	 console.log("inside no check list");
                	 var message1 = new ecm.widget.dialog.MessageDialog(
                             {
                                 text : "No Documents checklist Configured for this product id : " +this.prodctValue+
                                 		"<br>Users can add the documents after registering the case"
                                 	
                             });
                         message1.show();
                	 }
        			
        		else
        			{
        			 this.docdailog.setMaximized(true);//added by vara
              		 this.docdailog.show();
	
        			}
        		

        		}
        	else
        		{
        		var message = new ecm.widget.dialog.MessageDialog(
                        {
                            text : "Please Select Product Code"
                        });
                    message.show();
        		}
        },
         submit:function(payload)
           {
                
           console.log("update PropertyEvent ", payload.change.id);
           var _self=this;
           _self.thisInstance = this;
                 if(payload.change.id=="LJ_ProductCode")
                    {
                   this.docUpdateEvent="UPDATED";
                     var productID=payload.change.value;
                     _self.prodctValue=productID;
                     console.log("prodcode=",productID);
                     if(productID)
                 	{
                    	 console.log("productinsidesearchcalls");
                    	 if(_self.docdailog)
                    		 {
                    		 console.log("destoryed")
                    		 _self.docdailog.destroy();
                    		 }
                    	 _self.docdailog=new DocumentDailog();
            		  console.log("docdailog",_self.docdailog);
            	
                     _self.docdailog.search(productID);
                 	}
       
                    }
                 
              
           },
         
        handleValidation:function(context, complete, abort)
        {
              var _self=this;
              
        	    var deferred = new Deferred();
        	    var myAsyncData = deferred.promise;
        	    console.log("this.doccheckListCount",this.doccheckListCount)
        	            	    console.log("this.doccheckListCount",this.doccheckListCount!='NEW')

        	    if(this.doccheckListCount!='NEW' && this.doccheckListCount<1)
        	    	{
                     complete();
                     return;
        	    	}
        	    console.log("this.doccheckListCount",this.docUpdateEvent)

        	    if(this.docUpdateEvent=="UPDATED")
        	    	{
        	    	 setTimeout(function(){
               	      deferred.resolve(_self.docdailog.handleValidation(context, complete, abort));
               	    },1000);

               	
               	myAsyncData.then(function(docValidation) {
               		
               	    console.log("my data is"+docValidation);
               	    
               	    if(docValidation=="fail"){
                           abort({message:'Please make sure that all Require documents added '});
           		       }
                       else
                       	{
                           complete();
                       	} 
               	});	
        	    	}
        	    else
        	    {
                    complete();
  	
        	    }
        	    
  
        	   
      	
      },
        afterCreateCase:function(payload)
        {
        	
        	 if(this.doccheckListCount<1)
 	    	{
              complete();
              return;
 	    	}
        	 
        	return this.docdailog.afterCreateCase(payload);	
        	
        	
        },
        
        search: function(productID,payload) {},
       
      uploadFile:function(file,caseID,payload,doCode)
        {}
		
        
           
            
});
});