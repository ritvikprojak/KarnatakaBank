var editable = payload.workItemEditable;
if (ecm.model.desktop.currentRole.name === "{Some Role}") {
    var workItem = editable.icmWorkItem;
    var newResponses = workItem.responses.filter(function(response) {
        return response !== "{Response To Remove}";
    });
    workItem.responses = newResponses;
}