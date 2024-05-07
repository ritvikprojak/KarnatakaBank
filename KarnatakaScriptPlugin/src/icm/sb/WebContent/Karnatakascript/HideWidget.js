var coord = payload.coordination;
var caseEdit = payload.caseEditable;
var solution = this.solution;
var prefix = solution.getPrefix();
if (payload.eventName === "icm.SendWorkItem" )
{
var coordination = payload.coordination;
                        
var workEdit = payload.workItemEditable;
                    
if(workEdit.icmWorkItem.stepName === "Request for PreSubmission Meeting")
    {            
require(["icm/model/properties/controller/ControllerManager", "icm/base/Constants","ecm/model/Repository"],function(ControllerManager, Constants,repository)
            {            
                coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort)
                {
                                        
                    var collectionController = ControllerManager.bind(workEdit);
                    var Controller = collectionController.getPropertyController("CPA_VarHideAttachment"); // CPA_VarHideAttachment Case property
                   
                    var HideAttachment = Controller.get("value");
            
                    if(HideAttachment == "Yes")
                    {
                    dojo.query("span").forEach(function(item)
                        {
                            if(item.innerHTML==="Attachments")
                                {
                                    var prnt = item.parentNode.parentNode.parentNode.parentNode.parentNode;
                                    prnt.style.display = "none";
                                }
                        });
                    }
                        complete();
                
                });
                
                /* Use the AFTERLOADWIDGET coordination topic handler to release the controller binding for the editable. */
                /* Since the prop controller can be shared, doing this in the AFTERLOADWIDGET ensures no other widget overrides your changes. */
                
                coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET, function(context, complete, abort) {
                    /* Release the controller binding for the editable. */
                    ControllerManager.unbind(workEdit);
                    
                    /* Call the coordination completion method. */
                    complete();
                });
            });
    }
}