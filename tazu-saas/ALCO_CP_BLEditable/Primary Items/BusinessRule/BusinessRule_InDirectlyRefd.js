/*===== export metadata =====
{
  "contextId" : "GL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "InDirectlyRefd",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "LibRefTestA" ],
  "name" : "InDirectlyRefd",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
var libSound;

function setSoundLib2(sound) {
	libSound = sound;
	return libSound;
}
/*===== business library exports - this part will not be imported to STEP =====*/
exports.libSound = libSound
exports.setSoundLib2 = setSoundLib2