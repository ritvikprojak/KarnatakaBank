require(["dojo/_base/lang",
         "icm/action/Action","icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(lang, Action,Constants, ControllerManager){
    lang.setObject("addtaskscript", {
        "passthrough": function(payload, solution, role, scriptAdaptor){
            return payload;
        },
		
        
		
        discrepancyTask:function(payload, solution, role, scriptAdaptor){
        	
        	console.log(this.name,": ",payload);

        	 var responseself = scriptAdaptor;
        	 responseself.editable=payload.taskEditable.getLaunchStep();
        	require(["icm/base/Constants", "icm/model/properties/controller/ControllerManager"], function(Constants, ControllerManager) {
        	   /* Get the coordination and editable objects from the event payload. */
        	 
        	   var coordination = payload.coordination;
        	   var editable = payload.taskEditable.getLaunchStep();

        	   /* Change me to your property name */
        	  // var theProperty = solutionPrefix + "_AdditionalDocumentRequiredForCase";

        	   /* Use the LOADWIDGET coordination topic handler to obtain the controller binding */
        	   /* for the editable and to update the properties. */
        	   coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET, function(context, complete, abort) {
        	      /* Obtain the controller binding for the editable. */
        	      var collectionController = ControllerManager.bind(editable);
        	      if(!responseself.hasOwnProperty('propsController'))
  	        		responseself.propsController = ControllerManager.bind(responseself.editable);
        	      complete();
        	   });

        	   /* Use the AFTERLOADWIDGET coordination topic handler to release the controller binding for the editable. */
        	   coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
        	      /* Release the controller binding for the editable. */
        	      ControllerManager.unbind(editable);

        	      /* Call the coordination completion method. */
        	      complete();
        	   });
        	});
        	
        
        },
        propupdateactiondiscrepancyTask: function(theController,payload, solution, role, scriptAdaptor){
        	
        	var changedPropertyId = payload.change.id;
        	var changedPropertyValue = payload.change.value;
        	var userId = ecm.model.desktop.userId;
        	var propcontroller=scriptAdaptor.propsController;
        	if(changedPropertyId === "CCS__AdditionalDocumentRequiredForCase" && changedPropertyValue === true){
        		
        	}else{
        		
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
});


