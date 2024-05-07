 console.log("START >>> Customwidgetplugin Start Plugin 1.E");
  
var icmContextRoot = "/CustomWidgetContextRoot";
   dojo.setObject("ecmwdgt.contextRoot", icmContextRoot);
	var wspaths = {
			"customf/widgetf":icmContextRoot+"/customf/widgetf",
			"icm":"/ICMClient/icm",
			"ecm":"/navigator/ecm"
		};
	require({paths:wspaths});
	
require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/domReady!"], function(declare, lang){	
	//NOTE ::::  context root we are specifying in the application.xml
		
	var currentLocation = location.href;
	//console.log("**********************CurrentLocation**************"+ currentLocation);
});










//LJ_LoanJourneyDocument
//LJ_LARNumber
//LJ_CustomerName
//LJ_ReferenceNumber
//
//
//Customername
//
//RefenceNumber
//Branch code
//
//String LARNumber = request.getParameter("LARNumber");
//	    String customerName = request.getParameter("customerName");
//	    String refrenceNumber = request.getParameter("refrenceNumber");
//	    String branchCode = request.getParameter("branchCode");




