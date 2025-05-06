/*===== export metadata =====
{
  "contextId" : "GL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Add_items_to_change_package",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "Add items to change package",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome);
var newCP = cpHome.getChangePackageByID("newProduct");
var items = newCP.getPrimaryItems();
logger.info("size before adding: " + items.size());


//var itemToAdd = manager.getNodeFromURL("step://product?editor=Product&contextid=EN+All+USA&id=Product-101524&workspaceid=Approved");
//logger.info("able to retrieve node from URL: " + itemToAdd.getName());

var attrGrp = manager.getAttributeGroupHome().getAttributeGroupByID("Single Valued Attributes");
//var attr = manager.getAttributeHome().getAttributeByID("AttributeHelpText");

//var attrGrpURL = attrGrp.getURL();
newCP.addItem(attrGrp);
//newCP.addHierarchy(attrGrp);

//var items = newCP.getPrimaryItems();
//logger.info("size after adding: " + items.size());
}