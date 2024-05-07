require(
		[ "dojo/_base/lang", "icm/action/Action", "icm/base/Constants",
				"icm/model/properties/controller/ControllerManager" ],
		function(lang, Action, Constants, ControllerManager) {
			lang
					.setObject(
							"csvexport",
							{
								"passthrough" : function(payload, solution,
										role, scriptAdaptor) {
									return payload;
								},

								inbasketExport : function(payload, solution,
										role, scriptAdaptor) {
									try {
//added by akshay 02-feb
										var self = scriptAdaptor;
										/* Get the work items that were selected */
										var selectedWorkItems = payload.WorkItemReference;
										// alert("selectedWorkItems="+selectedWorkItems);

										var fileName = generateFileNameWithTimestamp(
												"Invoice Process System-", "csv");

										/* Variable declarations */
										var currentWorkItem;
										var allSelectedWorkItem = [];
										var i;
										/* Get case object */
										var caseobject;

										// alert(dojo.isArray(selectedWorkItems));
										if (dojo.isArray(selectedWorkItems)) {
											for (i = 0; i < selectedWorkItems.length; i++) {

												// currentWorkItem =
												// selectedWorkItems[i].ecmWorkItem.resultSet.items[i];//.retrieveAttributes;

												currentWorkItem = selectedWorkItems[i].ecmWorkItem.attributes;

												// console.log("currentWorkItem.caseObject="+currentWorkItem.items.length);

												allSelectedWorkItem[i] = currentWorkItem;

											}
										} else {
											// alert("Hwlll");
											allSelectedWorkItem = selectedWorkItems.ecmWorkItem.attributes;

										}

										console.log("*****csv fileName *****");
										console.log(fileName);

										var newdvprops = [
												"DMS_ReferenceNumber",
												"CCS_CaseSource",
												"DMS_FullName",
												"DMS_NICNumber", "CCS_Status",
												"DMS_PreferedBranchName",
												"DMS_DateofBirth",
												"DMS_PreferedBranchCode" ];
										/*
										 * allSelectedWorkItem.columnNames = [
										 * "F_StepName", "F_CreateTime",
										 * "F_Subject", "queueName" ];
										 */

										allSelectedWorkItem.columnNames = newdvprops;

										exportResultSet(fileName,
												allSelectedWorkItem,
												selectedWorkItems);

									} catch (Error) {
										alert("Source Module: Search Export Action Adaptor\r\n\r\n"
												+ Error.name
												+ " -"
												+ Error.description
												+ "\r\n"
												+ Error.message);
										/*
										 * An error was thrown. Always return
										 * false
										 */
										return false;
									}

									// return payload;
								},

								searchBasketExport : function(payload,solution, role, scriptAdaptor) {
									
								},

								bulkdispatch : function(payload, solution,
										role, scriptAdaptor) {

									try {

										var self = scriptAdaptor;
										/* Get the work items that were selected */
										var selectedWorkItems = payload.WorkItemReference;
										// alert("selectedWorkItems="+selectedWorkItems);

										/* Variable declarations */
										var currentWorkItem;
										var allSelectedWorkItem = [];
										var i;
										/* Get case object */
										var caseobject;
										var payloadId = payload.menuId;
										var responseflag = false;
										var userId = ecm.model.desktop.userId;
										// alert(dojo.isArray(selectedWorkItems));
										if (dojo.isArray(selectedWorkItems)) {
											for (i = 0; i < selectedWorkItems.length; i++) {

												var workitem = selectedWorkItems[i];
												var editable = workitem
														.createEditable();
												var stepname = workitem.ecmWorkItem.attributes.F_StepName;
												var response = "";

												if (stepname === "Card Dispatch Step") {

													if (payloadId === "icm.courier") {
														response = "COURIER DISPATCH";

													} else if (payloadId === "icm.registerpost") {
														response = "REGISTER POST DISPATCH";
													}
												} else if (stepname === "Courier Dispatch Step") {

													if (payloadId === "icm.dispatch") {
														response = "SENT";
													}

												} else if (stepname === "Register Post Dispatch Step") {

													if (payloadId === "icm.dispatch") {

														response = "CARD DISPATCHED";
													}

												} else if (stepname === "Dispatch In Progress Step") {

													if (payloadId === "icm.return") {
														response = "RETURN";
													}
												} //added for bulk complete in Card Creation Sucess 
												else if (stepname === "Prime Integration Final Step") {

													if (payloadId === "ecm.model.WorkItem.completeStep") {
														response = "COMPLETE";
													}
												}

												// editable.setSelectedResponse("Approve");

												if (response !== "") {
													if (editable.lockedUser === ""
															|| editable.lockedUser === userId) {
														editable.lockStep();
														editable
																.setSelectedResponse(response);
														editable.completeStep();
														responseflag = true;
													}
												} else {
													alert("This option is not available at this step");
													break;
												}

											}

											if (responseflag)
												alert("Bulk response completed,please refresh inbasket");
										} else {
											var workitem = selectedWorkItems;
											var editable = workitem
													.createEditable();
											var stepname = editable
													.getStepName();
											var response = "";
											var responseflag = false;

											if (stepname === "Card Dispatch Step") {

												if (payloadId === "icm.courier") {
													response = "COURIER DISPATCH";

												} else if (payloadId === "icm.registerpost") {
													response = "REGISTER POST DISPATCH";
												}
											} else if (stepname === "Courier Dispatch Step") {

												if (payloadId === "icm.dispatch") {
													response = "SENT";
												}

											} else if (stepname === "Register Post Dispatch Step") {

												if (payloadId === "icm.dispatch") {

													response = "CARD DISPATCHED";
												}

											} else if (stepname === "Dispatch In Progress Step") {

												if (payloadId === "icm.return") {
													response = "RETURN";
												}
											} //added for bulk complete in Card Creation Sucess 
											  else if (stepname === "Prime Integration Final Step") {

												if (payloadId === "ecm.model.WorkItem.completeStep") {
														response = "COMPLETE";
												}
											}

											if (response !== "") {
												if (editable.lockedUser === ""
														|| editable.lockedUser === userId) {
													editable.lockStep();
													editable
															.setSelectedResponse(response);
													editable.completeStep();
													responseflag = true;
												}
											} else {
												alert("This option is not available at this step");

											}

											if (responseflag)
												alert("Bulk response completed,please refresh inbasket");

										}

										self.onBroadcastEvent("icm.Refresh",payload);

									} catch (Error) {
										alert("Source Module: Search Export Action Adaptor\r\n\r\n"
												+ Error.name
												+ " -"
												+ Error.description
												+ "\r\n"
												+ Error.message);
										/*
										 * An error was thrown. Always return
										 * false
										 */
										return false;
									}

									// return payload;

								},

								reportexport : function(payload,solution,role, scriptAdaptor) {
									try {

										/* Get the work items that were selected */
										var self = scriptAdaptor;
										// var selectedWorkItems =
										// self.getActionContext("Case");
										var selectedWorkItems = payload.Case;
										// alert("selectedWorkItems="+selectedWorkItems);

										
										
										var fileName = generateFileNameWithTimestamp(
												"Credit Card Reports-", "csv");

										/* Variable declarations */
										var currentWorkItem;
										var allSelectedWorkItem = [];
										var i;
										/* Get case object */
										var caseobject;

										// alert(dojo.isArray(selectedWorkItems));
										if (dojo.isArray(selectedWorkItems)) {
											for (i = 0; i < selectedWorkItems.length; i++) {

												// currentWorkItem =
												// selectedWorkItems[i].ecmWorkItem.resultSet.items[i];//.retrieveAttributes;

												currentWorkItem = selectedWorkItems[i].caseFolder.attributes;

												// console.log("currentWorkItem.caseObject="+currentWorkItem.items.length);

												allSelectedWorkItem[i] = currentWorkItem;

											}
										} else {
											// alert("Hwlll");
											allSelectedWorkItem = selectedWorkItems.attributes;

										}

										console.log("*****csv fileName *****");
										console.log(fileName);
										var newdvprops = "";
										var newdvNames = "";

										var report = dijit.byId('reportType').value;
										fileName = report + "-" + fileName;

										if (report === "Registered Cases") {
											
										} else if (report === "RegulatoryRequirement") {
											
										} else if (report === "CanvassingReport") {
											
										} else {
											
										}

										allSelectedWorkItem.columnNames = newdvNames;
										allSelectedWorkItem.columnSymbolicNames = newdvprops;
										exportReportSet(fileName,
												allSelectedWorkItem,
												selectedWorkItems);

									} catch (Error) {
										alert("Source Module: Search Export Action Adaptor\r\n\r\n"
												+ Error.name
												+ " -"
												+ Error.description
												+ "\r\n"
												+ Error.message);
										/*
										 * An error was thrown. Always return
										 * false
										 */
										return false;
									}

									// return payload;
								}

							});

			function downloadFile(fileName, csvContent, selectedWorkItems) {

				var D = document;
				var a = D.createElement('a');
				var strMimeType = 'application/octet-stream;charset=utf-8';
				var rawFile;

				if (navigator.appName.toLowerCase().indexOf("microsoft") > -1) { // IE<10
					var frame = D.createElement('iframe');
					document.body.appendChild(frame);
					frame.setAttribute('style', 'display:none;');
					frame.contentWindow.document.open("text/html", "replace");
					frame.contentWindow.document.write(csvContent);
					frame.contentWindow.document.close();
					frame.contentWindow.focus();
					frame.contentWindow.document.execCommand('SaveAs', true,
							fileName);
					document.body.removeChild(frame);
					return true;
				}

				// IE10+
				if (navigator.msSaveBlob) {
					return navigator.msSaveBlob(new Blob([ csvContent ], {
						type : strMimeType
					}), fileName);
				}

				// html5 A[download]
				if ('download' in a) {
					var blob = new Blob([ csvContent ], {
						type : strMimeType
					});
					rawFile = URL.createObjectURL(blob);
					a.setAttribute('download', fileName);
				} else {
					rawFile = 'data:' + strMimeType + ','
							+ encodeURIComponent(csvContent);
					a.setAttribute('target', '_blank');
					a.setAttribute('download', fileName);
				}
				a.href = rawFile;
				a.setAttribute('style', 'display:none;');
				D.body.appendChild(a);
				setTimeout(function() {
					if (a.click) {
						a.click();
						// Workaround for Safari 5
					} else if (document.createEvent) {
						var eventObj = document.createEvent('MouseEvents');
						eventObj.initEvent('click', true, true);
						a.dispatchEvent(eventObj);
					}
					D.body.removeChild(a);
				}, 100);
			}

			function exportResultSet(filename, resultSet, selectedWorkItems) {
				/* var rows = self.resultSetToRows(resultSet); */

				var rows = resultSetToRows(resultSet, filename,
						selectedWorkItems);

				var processRow = function(row) {
					var finalVal = '';
					console.log("row=" + row);
					for (var j = 0; j < row.length; j++) {
						var innerValue = row[j] === null ? '' : row[j]
								.toString();
						var datefield = new Date(row[j]);
						if (!isNaN(datefield)) {

							var month = datefield.getMonth() + 1;
							var day = datefield.getDate();
							var year = datefield.getFullYear();
							innerValue = day + "/" + month + "/" + year;

						}
						;
						var result = innerValue.replace(/"/g, '""');
						if (result.search(/("|,|\n)/g) >= 0)
							result = '"' + result + '"';
						if (j > 0)
							finalVal += ',';
						finalVal += result;
					}
					return finalVal + '\n';
				};
				var content = "";
				for (var i = 0; i < rows.length; i++) {
					content += processRow(rows[i]);
				}
				/* self.downloadFile(filename, content); */
				downloadFile(filename, content, selectedWorkItems);
			}

			function exportReportSet(filename, resultSet, selectedWorkItems) {
				/* var rows = self.resultSetToRows(resultSet); */

				var rows = reportSetToRows(resultSet, filename,
						selectedWorkItems);

				var processRow = function(row) {
					var finalVal = '';
					console.log("row=" + row);
					for (var j = 0; j < row.length; j++) {
						var innerValue = row[j] === null || row[j] === undefined  ? '' : row[j]
								.toString();

						var datefield = new Date(row[j]);
						if (typeof row[j] === "number") {
							innerValue = row[j].toString();
						}else if(typeof row[j] == "boolean"){
							innerValue=(row[j] == true ? "YES" : "NO");
						}else if(typeof row[j] == "object"){
							innerValue= row[j].toString();
						}

						else if (!isNaN(datefield) && typeof row[j] == "object" ) {

							var month = datefield.getMonth() + 1;
							var day = datefield.getDate();
							var year = datefield.getFullYear();
							innerValue = day + "/" + month + "/" + year;

						}
						;
						var result = innerValue.replace(/"/g, '""');
						if (result.search(/("|,|\n)/g) >= 0)
							result = '"' + result + '"';
						if (j > 0)
							finalVal += ',';
						finalVal += result;
					}
					return finalVal + '\n';
				};
				var content = "";
				for (var i = 0; i < rows.length; i++) {
					content += processRow(rows[i]);
				}
				/* self.downloadFile(filename, content); */
				downloadFile(filename, content, selectedWorkItems);
			}

			function reportSetToRows(resultSet, filename, selectedWorkItems) {

				var rows = [];

				// Include column names

				var row, subrow, subrows, attribs, colName, columns = resultSet.columnSymbolicNames;
				var columnNames = resultSet.columnNames;
				rows.push(columnNames);

				// console.log("resultSetToRows before for
				// loop"+resultSet.items.length);

				console.log(resultSet.attributes);

				// Loop through each row in the resultSet

				if (dojo.isArray(selectedWorkItems)) {
					for (var r = 0; r < resultSet.length; r++) {

						row = [];
						subrow=[];
						subrows=[];
						/* attribs = resultSet.items[r].attributes; */
						attribs = resultSet[r];
						// process the current row by matching column names
						for (var c = 0; c < columns.length; c++) {
							colName = columns[c];
							if (attribs.hasOwnProperty(colName)) {
								if (attribs[colName] !== null) {
									
									var ColumnArray ="CCS_SupplimentaryCardNumber,CCS_BasicCardNumber,CCS_SupplimentaryCardNumber,CCS_CardCategoryMultiple,CCS_CreditLt,CCS_CardBrandMultiple,CCS_CardLimitSupp";
									if(ColumnArray.indexOf(colName) >= 0){
										
										var arrList1=attribs[colName];
										if(arrList1.length === 0){
											row.push("N/A");
										}else{
										row.push("");
										}
										for(var j=0;j<arrList1.length;j++){
											
											if(subrows.length<arrList1.length){
												for(var o=subrows.length ;o<arrList1.length-1;o++){
													
													subrow = new Array(columns.length);
													subrows.push(subrow);
												}
												
											}
											
											if(j==0){
												row[c]=arrList1[j];
											}else{
											subrow=subrows[j-1];
											subrow[c]=arrList1[j];
											subrows[j-1]=subrow;
											}
										}
										
										
									}else{
									row.push(attribs[colName]);
									}
								} else {
									row.push("N/A");
								}
							} else {

								if (colName === "No Of Days Passed") {
									
									report=dijit.byId('reportType').value;
									
									if(report === "CasesOnHold"){
									var date = attribs["CCS_DateCaseHold"];
									var days = days_between(new Date(date),
											new Date())
									row.push(days.toString());
									}else if(report === "CasesApproved"){
										var date = attribs["DateCreated"];
										var date2 = attribs["CCS_CardApprovedDate"];
										var days=0;
										if(date2!==null && date !==null){
											days = days_between(new Date(date),
													new Date(date2))	
										}
										
										row.push(days.toString());
									}else if(report === "CasesRejected" || report === "CasesTerminated"){
										var date = attribs["DateCreated"];
										var date2 = attribs["CCS_DateCaseRejected"];
										var days=0;
										if(date2!==null && date !==null){
											days = days_between(new Date(date),
													new Date(date2))	
										}
										
										row.push(days.toString());
									}else if(report === "CasesReturned"){
										var date = attribs["CCS_CardDispatchDate"];
										var date2 = attribs["CCS_DateCaseReturned"];
										var days=0;
										if(date2!==null && date !==null){
											days = days_between(new Date(date),
													new Date(date2))	
										}
										
										row.push(days.toString());
									}else if(report === "DispatchMode"){
										var date = attribs["CCS_CardDispatchDate"];
										var days=0;
										if( date !==null){
											days = days_between(new Date(date),
													new Date())	
										}
										
										row.push(days.toString());
									}else{

										var date = attribs["DateCreated"];
										
										var days=0;
										if( date !==null){
											days = days_between(new Date(date),
													new Date())	
										}
										
										row.push(days.toString());
									
									}
								}else {
									row.push("N/A");
								}
							}
						}
						
						rows.push(row);
						for(var w=0;w<subrows.length;w++){
							rows.push(subrows[w]);
						}
						
					}
				} else {

					row = [];
					subrows=[];
					/* attribs = resultSet.items[0].attributes; */
					attribs = resultSet;
					// process the current row by matching column names
					for (var c = 0; c < columns.length; c++) {
						colName = columns[c];
						if (attribs.hasOwnProperty(colName)) {
							if (attribs[colName] !== null) {
								
								var ColumnArray ="CCS_SupplimentaryCardNumber,CCS_BasicCardNumber,CCS_SupplimentaryCardNumber,CCS_CardCategoryMultiple,CCS_CreditLt,CCS_CardBrandMultiple,CCS_CardLimitSupp";
								if(ColumnArray.indexOf(colName) >= 0){
									
									var arrList1=attribs[colName];
									if(arrList1.length === 0){
										row.push("N/A");
									}else{
									row.push("");
									}
									for(var j=0;j<arrList1.length;j++){
										
										if(subrows.length<arrList1.length){
											for(var o=subrows.length ;o<arrList1.length;o++){
												subrow = new Array(columns.length);
												subrows.push(subrow);
											}
											
										}
										subrow=subrows[j];
										subrow[c]=arrList1[j];
										subrows[j]=subrow;
										
									}
									
									
								}else{
								row.push(attribs[colName]);
								}
							} else {
								row.push("N/A");
							}
						} else {

							if (colName === "No Of Days Passed") {
								
								report=dijit.byId('reportType').value;
								
								if(report === "CasesOnHold"){
								var date = attribs["CCS_DateCaseHold"];
								var days = days_between(new Date(date),
										new Date())
								row.push(days.toString());
								}else if(report === "CasesApproved"){
									var date = attribs["DateCreated"];
									var date2 = attribs["CCS_CardApprovedDate"];
									var days=0;
									if(date2!==null && date !==null){
										days = days_between(new Date(date),
												new Date(date2))	
									}
									
									row.push(days.toString());
								}else if(report === "CasesRejected" || report === "CasesTerminated"){
									var date = attribs["DateCreated"];
									var date2 = attribs["CCS_DateCaseRejected"];
									var days=0;
									if(date2!==null && date !==null){
										days = days_between(new Date(date),
												new Date(date2))	
									}
									
									row.push(days.toString());
								}else if(report === "CasesTerminated"){
									var date = attribs["DateCreated"];
									var date2 = attribs["CCS_DateCaseRejected"];
									var days=0;
									if(date2!==null && date !==null){
										days = days_between(new Date(date),
												new Date(date2))	
									}
									
									row.push(days.toString());
								}else if(report === "DispatchMode"){
									var date = attribs["CCS_CardDispatchDate"];
									var days=0;
									if( date !==null){
										days = days_between(new Date(date),
												new Date())	
									}
									
									row.push(days.toString());
								}else{

									var date = attribs["DateCreated"];
									
									var days=0;
									if( date !==null){
										days = days_between(new Date(date),
												new Date())	
									}
									
									row.push(days.toString());
								
								}
							}else {
								row.push("N/A");
							}
						}
					}
					rows.push(row);
					for(var w=0;w<subrows.length;w++){
						rows.push(subrows[w]);
					}
				}
				return rows;
			}

			function days_between(date1, date2) {

				// The number of milliseconds in one day
				var ONE_DAY = 1000 * 60 * 60 * 24

				// Convert both dates to milliseconds
				var date1_ms = date1.getTime()
				var date2_ms = date2.getTime()

				// Calculate the difference in milliseconds
				var difference_ms = Math.abs(date1_ms - date2_ms)

				// Convert back to days and return
				return Math.round(difference_ms / ONE_DAY)

			}

			function generateFileNameWithTimestamp(prefix, ext) {
				var currentDate = new Date(), fileName = prefix
						+ currentDate.getFullYear()
						+ (currentDate.getMonth() + 1) + currentDate.getDate()
						+ currentDate.getHours() + currentDate.getMinutes()
						+ currentDate.getSeconds() + "." + ext;
				return fileName;
			}
			function resultSetToRows(resultSet, filename, selectedWorkItems) {

				var rows = [];

				// Include column names

				var row, attribs, colName, columns = resultSet.columnNames;
				rows.push(columns);

				// console.log("resultSetToRows before for
				// loop"+resultSet.items.length);

				console.log(resultSet.attributes);

				// Loop through each row in the resultSet

				if (dojo.isArray(selectedWorkItems)) {
					for (var r = 0; r < resultSet.length; r++) {

						row = [];
						subrow=[];
						/* attribs = resultSet.items[r].attributes; */
						attribs = resultSet[r];
						// process the current row by matching column names
						for (var c = 0; c < columns.length; c++) {
							colName = columns[c];
							if (attribs.hasOwnProperty(colName)) {
								if (attribs[colName] !== null) {
									row.push(attribs[colName]);
								} else {
									row.push("N/A");
								}
							} else {
								row.push("N/A");
							}
						}
						rows.push(row);
					}
				} else {

					row = [];
					/* attribs = resultSet.items[0].attributes; */
					attribs = resultSet;
					// process the current row by matching column names
					for (var c = 0; c < columns.length; c++) {
						colName = columns[c];
						if (attribs.hasOwnProperty(colName)) {
							if (attribs[colName] !== null) {
								row.push(attribs[colName]);
							} else {
								row.push("N/A");
							}
						} else {
							row.push("N/A");
						}
					}
					rows.push(row);
				}
				return rows;
			}
		});
