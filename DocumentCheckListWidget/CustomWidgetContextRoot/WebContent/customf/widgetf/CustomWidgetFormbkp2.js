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
        "icm/model/CaseEditable",
        "dijit/Dialog",
        "dijit/form/SimpleTextarea",
        "dijit/form/Button",
        "ecm/widget/dialog/ConfirmationDialog",
        "idx/form/_DateTimeTextBox",
        "dojo", "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore",
        "dojo/data/ObjectStore",
        "dojo/store/Memory",
        "dijit/layout/ContentPane",
        "dojox/grid/EnhancedGrid",   
        "dojox/grid/enhanced/plugins/Pagination",
        "customf/widgetf/DocumentDailog"],
        
        function(declare,lang,dom,on,registry,json, _TemplatedMixin, _BaseWidget, BasePageWidget,BaseDialog,MessageDialog,
                Constants,ControllerManager,Request,Desktop,CaseEditable,Dialog,SimpleTextarea,Button,ConfirmationDialog,
                _DateTimeTextBox,Dojo,DataGrid,ItemFileWriteStore,ObjectStore,Memory,ContentPane,EnhancedGrid,Pagination,DocumentDailog){
              window.onerror = function(){return true;};//code to disable java script error in IE8  
            
             
        return declare("customf.widgetf.CustomWidgetForm",[], {
      
        newCaseType: null,
        thisInstance: null,
        prodctValue:null,
        docdailog:null,
         _self:this,
     
         
   postCreate:function(){
       this.inherited(arguments);
       this.thisInstance = this;
    },
    handleICM_SendNewCaseInfoEvent: function(payload) {
        
        this.newCaseType = payload.caseEditable;
        
     /*   this.thisInstance = this;
        payload.coordination.participate(
                Constants.CoordTopic.VALIDATE,
                
               lang.hitch(this, 'handleValidation')
        );*/
    
         
        },
        openDocListDailog: function()
        {
        	if(this.prodctValue)
        		{
        		 this.dailog.show(this.prodctValue);
                
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
             		 //this.lookupResultGrid.destroy();
                	//this.lookupResultGrid=null;
                     var productID=payload.change.value;
                     _self.prodctValue=productID;
                     console.log("prodcode=",productID);
                     if(productID)
                 	{
                    	 console.log("productinsidesearchcalls");
                 	//_self.lookupResultGrid=null;
                    // _self.search(productID,payload);
                		  docdailog=new DocumentDailog();
                		  console.log("docdailog",docdailog);
                		 _self.docdailog.search(productID);
                 	}
       
                    }
                 
              
           },
           
        handleValidation:function(context, complete, abort)
        {
        	var docvalidation=this.docdailog.handleValidation(context, complete, abort);

        	  if(docvalidation=="fail"){
                  abort({message:'Please make sure that all Require documents added '});
  		       }
              else
              	{
                  complete();
              	}
        },
        afterCreateCase:function(payload)
        {
        	return this.docdailog.afterCreateCase(payload);	
        }
        
      

        
           
            
});
});