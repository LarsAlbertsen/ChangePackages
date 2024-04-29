/*===== export metadata =====
{
  "contextId" : "GL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ReadExternalActivityLog",
  "type" : "BusinessFunction",
  "setupGroups" : [ "BusinessFunctions" ],
  "name" : "ReadExternalActivityLog",
  "description" : "For testing purposes",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "DateBindContract",
    "alias" : "date",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "StringBindContract",
    "alias" : "filter",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (date,filter) {
var dateString = new java.text.SimpleDateFormat("YYYY-MM-dd").format(date);
logger.info(dateString + " " + filter);
var file = new java.io.File(new java.io.File("diag/activity/"+dateString.substring(0,7)),dateString + ".log")
var reader = new java.io.BufferedReader(new java.io.FileReader(file, java.nio.charset.StandardCharsets.UTF_8));
try {
while (reader.ready()) {
	var line = reader.readLine();
	if (line.contains(filter)) {
		logger.info(line);
	}
}
return "";
} finally {
	reader.close();
}

}