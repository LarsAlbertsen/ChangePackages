/*===== export metadata =====
{
  "contextId" : "GL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ALCO_BFwithuserBind",
  "type" : "BusinessFunction",
  "setupGroups" : [ "BusinessFunctions" ],
  "name" : "ALCO_BFwithuserBind",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "UserBindContract",
    "alias" : "user",
    "parameterClass" : "com.stibo.core.domain.impl.UserImpl",
    "value" : "SSOUSER2",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ ]
}
*/
exports.operation0 = function (user,log,manager) {
log.info(user);
}