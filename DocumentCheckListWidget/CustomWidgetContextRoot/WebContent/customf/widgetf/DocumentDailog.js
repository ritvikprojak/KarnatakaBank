define([
        "dojo/_base/declare", "dojo", "dojo/_base/lang", "dojox/grid/DataGrid", "dojo/data/ItemFileWriteStore",
        "ecm/widget/dialog/BaseDialog",
        "dojo/dom",
        "icm/model/properties/controller/ControllerManager",
        "dojo/json",
        "dijit/registry",
        "ecm/model/Request",
        "dojo/data/ObjectStore",
        "dojo/store/Memory",
        "dijit/layout/ContentPane",
        "dojox/grid/EnhancedGrid",
        "ecm/model/Desktop",
        "dojox/grid/enhanced/plugins/Pagination",
        "dojo/text!./templates/DocumentDailog.html"
    ],
    function(declare, dojo, lang, DataGrid, ItemFileWriteStore, BaseDialog, dom,ControllerManager, JSON, registry, Request, ObjectStore, Memory, ContentPane, EnhancedGrid,
        Desktop, Pagination,template) {

        //code to disable java script error in IE8  
        window.onerror = function() {
            return true;
        };
        return declare("customf.widgetf.DocumentDailog", [BaseDialog], {

            contentString: template,
            widgetsInTemplate: true,
            resizable: true,
            lookupResultGrid:null,
            lookupResultDataStore:null,
            thisInstance:null,
            jsondata:null,
            rowSelectedPayload:null,
            lookupBaseDialog:null,
            selectedFieldProperty:null,
            docListCount:null,

            
            postCreate: function() {
                console.log("partnersLookUpDailog *****postCreate() Start");
                this.lookupResultGrid = null;
                this.inherited(arguments)
                thisInstance = this;
                console.log(this);
                console.log("partnersLookUpDailog *****postCreate() End");

            },

            /**
             * Shows the dialog.
             * 
             * @param payload
             *            An instance of {@link ecm.model.Repository}.
             * @param baseDialog
             *		  An instance of {@link ecm.model.Repository}.
             * @param selectedlookupField
             *			  An variable of selected Field
             */

            show: function() {
                console.log("partnersLookUpDailog *****show() Start");
                
                //this.selectedFieldProperty = selectedlookupField;
                this.inherited(arguments);
                console.log("partnersLookUpDailog *****show() Start");
            },

            /**
             * Search a Results based on Lookup Search Criteria
             */
            search: function(productID) {
                var _this=this;
                var serviceParams = new Object();
                var lookupResultDataStore=null;
                var data=null;
                serviceParams.requestType = "getDocCheckListParamas";
               
                     serviceParams.ProductID=productID;
               
                // Invoking Service for Look up Results
                Request.invokePluginService("CustomWidgetFormMainPluginId", "DocCheckListService", {
                    requestParams: serviceParams,
                    requestCompleteCallback: function(lookupResultResponse) {
                    	

                    	var storeLayout=_this.getLayout();
                  debugger;

                        if (_this.lookupResultGrid) {
                      

                        	 var checklist=lookupResultResponse.RESPONSE;                    
                             var numrows=checklist.length;
                            console.log("numrows",numrows)
                            _this.docListCount=numrows;
                            console.log(" _this.docListCount", _this.docListCount);
                             
                             data={
                                     identifier:'id',
                                     items:[]
                               };
                             for(var i=0, j=checklist.length;i<numrows;i++)
                                 {
                                 data.items.push(dojo.mixin({id:i+1},checklist[i%j]));
                                 }
            
                             lookupResultDataStore=new dojo.data.ItemFileWriteStore({data:data});
                      

                         
                            _this.lookupResultGrid.setStructure(storeLayout);
                            
                            _this.lookupResultGrid.setStore(lookupResultDataStore);
                            _this.lookupResultsDisplayGridId.refresh();

                            _this.lookupResultGrid.startup();
                            _this.lookupResultGrid.render();
                      
                        	
                        }
                        else
                        	{
                        
                        	
                        	
                        	 var checklist=lookupResultResponse.RESPONSE;                    
                             var numrows=checklist.length;
                             _this.docListCount=numrows;

                             data={
                                     identifier:'id',
                                     items:[]
                             };
                             for(var i=0, j=checklist.length;i<numrows;i++)
                                 {
                                 data.items.push(dojo.mixin({id:i+1},checklist[i%j]));
                                 }
            
                             lookupResultDataStore=new dojo.data.ItemFileWriteStore({data:data});
                             console.log("if  store --",lookupResultDataStore);

                             
                        	var grid = new EnhancedGrid({
                                "data-dojo-attach-point": "lookupResultsDisplayGridAttachPoint",
                                store: lookupResultDataStore,
                                structure:storeLayout,
                                autoWidth: true,
                                autoHeight: true,
                                selectionMode: 'single',
                                noDataMessage: "No Data Available"
                            }, _this.lookupResultsDisplayGridId);
                        	
                            grid.startup();

                        	_this.lookupResultGrid=grid;
                        	
                             console.log("_this.lookupResultGrid",_this.lookupResultGrid);
                        }

                    }
                });
                console.log("LookUpDailog *****Search() END");
            },
            getLayout:function()
    		{
    		    	  var  lookupFieldsResultLayout= [
    		    	                                  {
    		    	                                      name : 'KYC Documents',
    		    	                                      field : 'KYC_Documents',
    		    	                                      hidden:true,
    		    	                                      style : 'text-align: center;border: 1px solid #9f9f9f; ',
    		    	                                      width : "200px",
    		    	                                  },
    		    	                                  {
    		    	                                      name : 'Document Description',
    		    	                                      field : 'Documents_desc',
    		    	                                      
    		    	                                      style : 'text-align: left;border: 1px solid #9f9f9f; ',
    		    	                                      width : "500px",
    		    	                                  },
    		    	                                  {
    		    	                                      name : 'Document Code',
    		    	                                      field : 'DOC_CODE',
    		    	                                      hidden:true,
    		    	                                      style : 'text-align: left;border: 1px solid #9f9f9f; ',
    		    	                                      width : "90px",
    		    	                                  },
    		    	                                  {
    		    	                                      name : 'Required',
    		    	                                      field : 'REQUIRED',

    		    	                                      hidden:true,
    		    	                                      style : 'text-align: left;border: 1px solid #9f9f9f; ',
    		    	                                      width : "90px",
    		    	                                  },
    		    	                                  {
    		    	                                      name : 'Add Document',
    		    	                                      field : 'Documet_Path',
    		    	                                      style : 'text-align: center; border: 1px solid #9f9f9f; ',
    		    	                                      width : "450px",
    		    	                                      editable : false,
    		    	                                       
    		    	                                  /*    //navigable : true,
    		    	                                      //allowEventBubble : true,
    		    	                                    // setCellValue : _this.addDocument,
    		    	                                    */
    		    	                                      formatter : function(item,count) {
    		    	                                
    		    	                                          var content = '<form data-dojo-attach-point="_fileInputForm'+count+'" name="fileUploadForm" enctype="multipart/form-data" accept-charset="UTF-8" method="post" target="'
    		    	                                             + count
    		    	                                             + '_fileInputIFrame">'
    		    	                                             + '<input type="file" required="true" data-dojo-attach-point="file'
    		    	                                             + count
    		    	                                             + '" name="uploadFile" class="fileInput" data-dojo-attach-point="_fileInput'+count+'"/>'
    		    	                                             + '<iframe name="'
    		    	                                             + count
    		    	                                             + '_fileInputIFrame" class="fileName'+count+'" data-dojo-attach-point="'
    		    	                                             + count
    		    	                                             + '_fileInputIFrame" style="display: none"></iframe> </form>'
    		    	                                          return content;
    		    	                                      }
    		    	                                  }
    		    	                                                               
    		    	                             
    		    	                                  
    		    	              ];
    		    	  
    		    	  return lookupFieldsResultLayout;
    		},
            /**
             * Set Values to Controllers
             * 
             * @param propsController
             * @param dataType
             * @param controller
             * @param value		  
             */
            setValuesToControllers: function(propsController, dataType, controller, value) {
            	
            },
            afterCreateCase:function(payload)
            {  var _this=this;
                
                var caseID=payload.caseEditable.id;
                var dataStore=_this.lookupResultGrid.store;
                var filefields=dojo.query(".fileInput");

                var fileCount=0;
                var recordslength=dataStore._arrayOfAllItems.length;
                var arrayItems=dataStore._arrayOfAllItems;
                for(var j=0;j<recordslength;j++){
                    if(filefields[j].files.length>0)
                        {
                    	var doCode=arrayItems[j].DOC_CODE;
                        _this.uploadFile(filefields[j].files[0],caseID,payload,doCode);
                        }
                    console.log("fileCount",fileCount)
                }
                return payload;
            },
            handleValidation:function(context, complete, abort)
            {
                var _this=this;
             var docvalidation="true";
                var filefields=dojo.query(".fileInput");
                console.log("this--query",filefields);

                var dataStore=_this.lookupResultGrid.store;
                var arrayItems=dataStore._arrayOfAllItems;
                var fileCount=0;
                var recordslength=dataStore._arrayOfAllItems.length;
       
                for(var j=0;j<recordslength;j++){


                    if(arrayItems[j].REQUIRED=='YES'){
                    	
                    if(filefields[j].files.length==0) {
                    	docvalidation="fail";
                    	break;
                        }
                    }
                  } 

              return docvalidation;
            
            },
           
            uploadFile:function(file,caseID,payload,doCode)
            {
        	  
        	  var collectionController = ControllerManager.bind(payload.caseEditable);
    		  var LANNumber=collectionController.getPropertyController("LJ_LARNumber").get('value');
    		  var customerName= collectionController.getPropertyController("LJ_CustomerName").get('value');
    		  var referenceNumber= collectionController.getPropertyController("LJ_ReferenceNumber").get('value');
    		  
              var reqParams = new Object();
              
                reqParams.caseId=caseID;
                reqParams.caseType="LJ_LoanJourneyCasetype";
                reqParams.mimetype = file.type;
                reqParams.repositoryId="icmcmtos";
                reqParams.parm_part_filename = file.name;
                reqParams.LANNumber=LANNumber;
    		    reqParams.customerName=customerName;
    		    reqParams.referenceNumber=referenceNumber;
    		    reqParams.docCode=doCode;

    		    
                console.log("reqparams",reqParams)
                var fileform = new FormData();
                fileform.append("file", file);
                Request
                    .postFormToPluginService(
                        "CustomWidgetFormMainPluginId",
                        "CustomWidgetServicePluginId",
                        fileform,
                        {
                        requestParams : reqParams,
                        requestCompleteCallback : lang
                            .hitch(
                                this,
                                function(
                                    response) {
                                    // console.log(response);
                                    if (response === undefined
                                        || response === null
                                        || response === ""
                                        || response.message === "Fail") {
                                    var message = new ecm.widget.dialog.MessageDialog(
                                        {
                                            text : response.errorMessage
                                        });
                                    message
                                        .show();
                                    } else {
                                
                                        console.log("sucess");
                                    }
                                })
                        });
                
            },
            Reset: function() {
                console.log("LookUpDailog *****Reset() Start");
                this.dynamicLookupField.reset();
                console.log("LookUpDailog *****Reset() End");
            },
            getDocListCount:function()
            {
            	return this.docListCount;
            }

        });

    });