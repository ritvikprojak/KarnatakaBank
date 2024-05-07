require(["dojo/_base/lang",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, Action,Constants, ControllerManager){
    lang.setObject("cccasevalidation", {
        "passthrough": function(payload, solution, role, scriptAdaptor){
            return payload;
        },
		
        
        caseDetailValidation: function(payload, solution, role, scriptAdaptor){
        	
        	if(role.name === "Prime Officer"){
        		
        	}else if(role.name === "Initial Verifier"){
        		
        	}else if(role.name === "Credit Assistant"){
        		
        	}
        	else{
        	var caseEdit="";
        	if(payload.caseEditable != undefined){
    			caseEdit=payload.caseEditable;
    		}
        	var theController  = ControllerManager.bind(caseEdit);
        	makeAllReadOnly(theController);
        	var editable = ["CCS_DocumentFiledToCase","CCS_DocumentUploaded"];
        	makeEditOnly(editable,theController);
        	}
        },
        
        caseDetailValidationCA: function(payload, solution, role, scriptAdaptor){
        	var caseEdit="";
        	if(payload.caseEditable != undefined){
    			caseEdit=payload.caseEditable;
    		}
        	var theController  = ControllerManager.bind(caseEdit);
        	makeAllReadOnly(theController);
        	var editable = ["CCS_DocumentFiledToCase","CCS_DocumentUploaded"];
        	makeEditOnly(editable,theController);
        	
        },
        caseDetailValidationIV: function(payload, solution, role, scriptAdaptor){
        	var caseEdit="";
        	if(payload.caseEditable != undefined){
    			caseEdit=payload.caseEditable;
    		}
        	var theController  = ControllerManager.bind(caseEdit);
        	makeAllReadOnly(theController);
        	var editable = ["CCS_DocumentFiledToCase","CCS_DocumentUploaded"];
        	makeEditOnly(editable,theController);
        	
        },
        
        caseDetailValidationPO: function(payload, solution, role, scriptAdaptor){
        	var caseEdit="";
        	if(payload.caseEditable != undefined){
    			caseEdit=payload.caseEditable;
    		}
        	var theController  = ControllerManager.bind(caseEdit);
        	makeAllReadOnly(theController);
        	var editable = ["CCS_DocumentFiledToCase","CCS_DocumentUploaded"];
        	makeEditOnly(editable,theController);
        	
        }
        
        
        
	});
    
    
    function removeMandatory(theController) {
    	
    	var propList=theController.getPropertyControllers("F_CaseFolder");
    	for( var i=0;i<propList.length;i++){	
    		propList[i].set("required", false);
    	}
    	return true;
    }
    
	function makeAllReadOnly(theController) {
    	
    	var propList=theController.getPropertyControllers("F_CaseFolder");
    	for( var i=0;i<propList.length;i++){	
    		propList[i].set("readOnly", true);
    	}
    	return true;
    }
	
	function makeEditOnly(propList,theController) {
    	
    	for( var i=0;i<propList.length;i++){
    		setCaseProperty(theController,"",propList[i],"readOnly",false)
    	}
    	return true;
    }
	
 function makeReadOnly(propList,theController) {
    	
    	for( var i=0;i<propList.length;i++){
    		setCaseProperty(theController,"",propList[i],"readOnly",true)
    	}
    	return true;
    }
	
	
	function makeAllEditOnly(propList,theController) {
		
		var propList=theController.getPropertyControllers("F_CaseFolder");
    	for( var i=0;i<propList.length;i++){	
    		propList[i].set("readOnly", false);
    	}
    	return true;
    }
	
	function makeHiddenOnly(theController) {
    	
    	var propList=theController.getPropertyControllers("F_CaseFolder");
    	for( var i=0;i<propList.length;i++){	
    		propList[i].set("hidden", true);
    	}
    	return true;
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


