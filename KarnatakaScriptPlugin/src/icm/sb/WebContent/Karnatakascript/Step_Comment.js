require(["dojo/_base/lang","dijit/ConfirmDialog",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, ConfirmDialog, Action,Constants, ControllerManager){
    lang.setObject("cccommentaction", {
        "passthrough": function(payload, solution, role, scriptAdaptor){
            return payload;
        },
		
         sendtaskcomments: function(payload, solution, role, scriptAdaptor){
           console.log("***** self inside  *****",payload);
        	        return payload;
          },
        commentaction: function(payload, solution, role, scriptAdaptor){
        	try {
        	    var self = scriptAdaptor;
        	    console.log("***** self *****");
        	    console.log(self);
        	    self.commentAdded = false;
        	    
        	    console.log("payload.eventName",payload.eventName);
        	    console.log("payload.eventName",payload);

        	    if (payload.eventName === "icm.SendWorkItem" || payload.eventName === "icm.SendEventPayload") {
        	        var coord = payload.coordination;
        	        self.workitemEdit = payload.workItemEditable;
        	        var solution = self.solution;
        	        var prefix = solution.getPrefix();
        	        
        	      
        	        
        	        require(["icm/base/Constants", "dijit/ConfirmDialog", "icm/model/properties/controller/ControllerManager"], function(Constants, ConfirmDialog, ControllerManager){
        	 
        	                require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
        	                    function(declare, lang,Constants, AddCommentDialog, CaseAction) {
        	                        console.log("Prompt add work item comment dialog throughscript adaptor.");
        	                        payload.coordination.participate(Constants.CoordTopic.VALIDATE, function(context, complete, abort) {
        	                            try {
        	                            	
        	                            	if(context[Constants.CoordContext.WKITEMRESPONSE] == "Return"){
        	                                var myStepName =self.workitemEdit.getStepName();
        	                                var myCase = self.workitemEdit.getCase();
        	                              
        	                                    if (self.commentAdded) {
        	                                    	
        	                                    	
        	                                        complete();
        	                                    }
        	                                    else {
        	                                        var addCommentDialog = new AddCommentDialog({
        	                                            artifactType : "Case",
        	                                            artifactLabel : myStepName,
        	                                            commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
        	                                            caseModel : myCase,
        	                                            workItem :self.workitemEdit.icmWorkItem,
        	                                            onClickClose : function() {
        	                                                if (self.commentAdded) {
        	                                                    complete();
        	                                                }
        	                                                else {
        	                                                    alert ("Please add comment to proceed with Loan journey System");
        	                                                    abort({silent:true});
        	                                                }
        	                                                AddCommentDialog.prototype.onClickClose.apply(this,arguments);
        	                                            }
        	                                        });
        	 
        	                                        dojo.connect(addCommentDialog.commentContentPane, "afterAddComment",lang.hitch(this,function() {
        	                                            self.commentAdded = true;
        	                	                        alert("after comment");

        	                                        }));
        	 
        	                                        addCommentDialog.show();
        	                                    }
        	                            	}else{
        	                            		complete();
        	                            	}
        	                               
        	                            }
        	                            catch (exception) {
        	                                alert(exception);
        	                                abort();
        	                            }
        	                        });
        	                    })
        	        });
        	 
        	        return payload;
        	    }
        	    else if (payload.eventName === "icm.custom.AddComment") {
        	        require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/dijit/CommentContentPane","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
        	            function(declare, lang,Constants, AddCommentDialog, CaseAction) {
        	                try {
        	                    console.log(" Comments Event Handler.");
        	                    var myStepName =self.workitemEdit.getStepName();
        	                    var myCase = self.workitemEdit.getCase();
        	 
        	                    var addCommentDialog = new AddCommentDialog({
        	                        artifactType : "Case",
        	                        artifactLabel : myStepName,
        	                        commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
        	                        caseModel : myCase,
        	                        workItem :self.workitemEdit.icmWorkItem
        	                    });
        	 
        	                    dojo.connect(addCommentDialog.commentContentPane, "afterAddComment",lang.hitch(this,function() {
        	                        self.commentAdded = true;
        	                        alert("after comment");

        	                    }));
        	 
        	                    addCommentDialog.show();
        	                }
        	                catch (exception) {
        	                    alert(exception);
        	                }
        	            })
        	 
        	    }
        	 
        	}
        	catch (exception) {
        	    alert(exception);
        	}

        }
        
        
	});
});


require(["dojo/_base/lang","dijit/ConfirmDialog",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, ConfirmDialog, Action,Constants, ControllerManager){
    lang.setObject("cccommentaction", {
        "passthrough": function(payload, solution, role, scriptAdaptor){
            return payload;
        },
		
        
        commentaction: function(payload, solution, role, scriptAdaptor){
        	try {
        	    var self = scriptAdaptor;
        	    console.log("***** self *****");
        	    console.log(self);
        	    self.commentAdded = false;
        	    
        	    
        	    if (payload.eventName === "icm.SendWorkItem" || payload.eventName === "icm.SendEventPayload") {
        	        var coord = payload.coordination;
        	        self.workitemEdit = payload.workItemEditable;
        	        var solution = self.solution;
        	        var prefix = solution.getPrefix();
        	        
        	      
        	        
        	        require(["icm/base/Constants", "dijit/ConfirmDialog", "icm/model/properties/controller/ControllerManager"], function(Constants, ConfirmDialog, ControllerManager){
        	 
        	                require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
        	                    function(declare, lang,Constants, AddCommentDialog, CaseAction) {
        	                        console.log("Prompt add work item comment dialog throughscript adaptor.");
        	                        payload.coordination.participate(Constants.CoordTopic.VALIDATE, function(context, complete, abort) {
        	                            try {
        	                            	
        	                            	if(context[Constants.CoordContext.WKITEMRESPONSE] == "Return"){
        	                                var myStepName =self.workitemEdit.getStepName();
        	                                var myCase = self.workitemEdit.getCase();
        	                               
        	                                    if (self.commentAdded) {
        	                                    	
        	                                    	
        	                                        complete();
        	                                    }
        	                                    else {
        	                                        var addCommentDialog = new AddCommentDialog({
        	                                            artifactType : "Case",
        	                                            artifactLabel : myStepName,
        	                                            commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
        	                                            caseModel : myCase,
        	                                            workItem :self.workitemEdit.icmWorkItem,
        	                                            onClickClose : function() {
        	                                                if (self.commentAdded) {
        	                                                    complete();
        	                                                }
        	                                                else {
        	                                                    alert ("Please add comment to proceed with Loan journey System");
        	                                                    abort({silent:true});
        	                                                }
        	                                                AddCommentDialog.prototype.onClickClose.apply(this,arguments);
        	                                            }
        	                                        });
        	 
        	                                        dojo.connect(addCommentDialog.commentContentPane, "afterAddComment",lang.hitch(this,function() {
        	                                            self.commentAdded = true;
        	                	                        //alert("after comment");

        	                                        }));
        	 
        	                                        addCommentDialog.show();
        	                                    }
        	                            	}else{
        	                            		complete();
        	                            	}
        	                               
        	                            }
        	                            catch (exception) {
        	                                alert(exception);
        	                                abort();
        	                            }
        	                        });
        	                    })
        	        });
        	 
        	        return payload;
        	    }
        	    else if (payload.eventName === "icm.custom.AddComment") {
        	        require(["dojo/_base/declare", "dojo/_base/lang", "icm/base/Constants","icm/dialog/addcommentdialog/dijit/CommentContentPane","icm/dialog/addcommentdialog/AddCommentDialog","icm/action/case/CaseAction"],
        	            function(declare, lang,Constants, AddCommentDialog, CaseAction) {
        	                try {
        	                    console.log(" Comments Event Handler.");
        	                    var myStepName =self.workitemEdit.getStepName();
        	                    var myCase = self.workitemEdit.getCase();
        	 
        	                    var addCommentDialog = new AddCommentDialog({
        	                        artifactType : "Case",
        	                        artifactLabel : myStepName,
        	                        commentContext :Constants.CommentContext.WORK_ITEM_COMPLETE,
        	                        caseModel : myCase,
        	                        workItem :self.workitemEdit.icmWorkItem
        	                    });
        	 
        	                    dojo.connect(addCommentDialog.commentContentPane, "afterAddComment",lang.hitch(this,function() {
        	                        self.commentAdded = true;
        	                        //alert("after comment");
        	                    }));
        	 
        	                    addCommentDialog.show();
        	                }
        	                catch (exception) {
        	                    alert(exception);
        	                }
        	            })
        	 
        	    }
        	 
        	}
        	catch (exception) {
        	    alert(exception);
        	}

        }
        
        
	});
});


