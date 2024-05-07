require(["dojo/_base/lang",

         "ecm/model/SearchCriterion"], function(lang, Criterion){

    lang.setObject("icmscripts", {

        "passthrough": function(payload, solution, role, scriptAdaptor){

            return payload;

        },

		

		addSearchCriteria: function(payload, solution, role, scriptAdaptor){

		

	

        	        		var role = ecm.model.desktop.currentRole.name;

        	        		var userName = ecm.model.desktop.userDisplayName;

        	        		var user = ecm.model.desktop.userId;
                                   var userId = user.toUpperCase();

							

							var serviceName="/loan/ldap/solId/?userId=";

                      var servicetype="GET";

                      var handler="json";

                      var parameterNames=["userId"];

                      var value =userId;

                     

                    //  var value1=getCaseProperty(theController,"",LAR,"value");

                      var parameterValues=[value];

               //  parameterValues.push(parameterValues);

                    

                          filterData= addcasescript.getRestCall(serviceName,handler,servicetype,parameterNames,parameterValues);

                        

                        

                          var solId=filterData.SOLID;

							

							

        	        		

		if(role === "Branch Maker"|| role === "Branch Checker" ){

			 var bool = solution.getPrefix()+'_SOL_ID';

			var criterion = new Criterion({"id": bool, "name": "SOL_ID", "selectedOperator": "EQUALS", "dataType": "xs:string","defaultValue" : solId, "value": solId, "values": [solId]});

			payload.searchTemplate.searchCriteria.push(criterion);

            return payload;

        }}

    });

});

