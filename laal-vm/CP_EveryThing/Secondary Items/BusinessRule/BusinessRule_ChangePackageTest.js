/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ChangePackageTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "ChangePackageTest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome);
var cp = cpHome.getChangePackageByID("laalvm");


var info2 = new com.stibo.core.domain.changepackage.ChangePackage.AddItemInfo(true, "Test", "Change", "Force");;


var newNameAndID = "CP-"+new java.util.Date().toString();
var setupHome = manager.getSetupGroupHome();
var myChangePackages = setupHome.getSetupGroupByID("LAALVM");
var newPck = myChangePackages.createChangePackage(newNameAndID);
newPck.setName(newNameAndID);
logger.info(""+(new java.util.Date())+" created");
var args = new java.util.HashMap();
var info = new com.stibo.core.domain.changepackage.ChangePackage.AddItemInfo(false, "Ignore", "Change", "Force");
args.put("step://attribute?contextid=Context3&id=LeafKey&workspaceid=Main", info);
//args.put("step://attributegroup?contextid=Context3&id=_LAAL+Attributes&workspaceid=Main", info2);
//args.put("step://attributegroup?contextid=Context3&id=Special+Groups&workspaceid=Main", info2);
newPck.addItems(args);
logger.info(""+(new java.util.Date())+" added items");
newPck.sealPackage("Sealing Comment", null);
logger.info(""+(new java.util.Date())+" sealed");

var toRemove= new java.util.HashSet();
var allItems = newPck.getItems(null);
logger.info("Got Items "+allItems.size());
allItems.toArray().forEach(function(item) {
	logger.info("anItem "+item.isEditable()+" " +item);
	if (item.getItemURL().contains("LeafKey")) {
		toRemove.add(item);
	}
});

logger.info("toRemove "+toRemove);

// Reopen 
cpHome.transitionVerifiedToEditing(newPck);

// remove again
newPck.removeItems(toRemove, null);


// add unapproved

args.put("step://product?contextid=Context3&id=Product+hierarchy+root&workspaceid=Main", info);
//args.put("step://attributegroup?contextid=Context3&id=_LAAL+Attributes&workspaceid=Main", info2);
//args.put("step://attributegroup?contextid=Context3&id=Special+Groups&workspaceid=Main", info2);
newPck.addItems(args);
var approvalProblems = newPck.getApprovalProblems();
logger.info("approvalProblems "+approvalProblems);


var aNode = manager.getNodeFromURL("step://SetupGroup?contextid=Context1&id=CPFeatures&workspaceid=Main");
logger.info("aNode "+aNode);


}