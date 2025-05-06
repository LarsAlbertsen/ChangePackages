/*===== export metadata =====
{
  "contextId" : "GL",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "SD_BA_KafkaStreamingReceiver",
  "type" : "BusinessAction",
  "setupGroups" : [ "SD_CP_Root" ],
  "name" : "SD_BA_KafkaStreamingReceiver",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "StreamingMessageBindContract",
    "alias" : "streamingMessage",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "StreamingExecutionReportLoggerBindContract",
    "alias" : "executionReportLogger",
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
  }, {
    "contract" : "ProductBindContract",
    "alias" : "parentProduct",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "SD_20241003",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "objectType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (streamingMessage,executionReportLogger,manager,logger,parentProduct,objectType) {
//checking context and workspace
var currentContextId = manager.getCurrentContext().getID();
var currentWorkspaceId = manager.getCurrentWorkspace().getID();
executionReportLogger.logInfo("Working in context '" + currentContextId + "' and workspace '" + currentWorkspaceId + "'");

//logging Kafka message info : offset, partition, topic
var offset = streamingMessage.metadata().offset();
var partition = streamingMessage.metadata().partition();
var topic = streamingMessage.metadata().topic();
executionReportLogger.logInfo("Handling message with offset '" + offset + "' from topic '" + topic + "', partition '" + partition + "'");

//logging headers
var iterator = streamingMessage.metadata().headers().iterator();
while(iterator.hasNext()) {
 var header = iterator.next();
 executionReportLogger.logInfo("Header key = " + new java.lang.String(header.key()) + ", value = " + new java.lang.String(header.value()))};

//converting message content to string and showing errors can be caught
var contentAsString = new java.lang.String(streamingMessage.content());
var messageContent = JSON.parse(contentAsString);

if (messageContent.id.endsWith("-0")) {
	throw "Failed on product with ID that ends with '-0' as expected";
}

//create product with provided id under predefined parent
if (messageContent.level.equals("0")) {
parentProduct.createProduct(messageContent.id, objectType);

executionReportLogger.logError("Product created : "+messageContent.id + " from message with offset '" + offset + "' from topic '" + topic + "', partition '" + partition + "'");

}
else {
var altParentProduct = manager.getProductHome().getProductByID("SD_Level"+messageContent.level+"-1");
altParentProduct.createProduct(messageContent.id, objectType);
}
}