process.env.AZURE_SERVICEBUS_NAMESPACE= "Endpoint=sb://peractodev.servicebus.windows.net/;SharedSecretIssuer=owner;SharedSecretValue=F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";   
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";
var http = require('http');
var azure = require('azure');

var serviceBusService = azure.createServiceBusService();

serviceBusService.createQueueIfNotExists('testqueue', function(error){
    if(!error){
        // Queue exists
    }
});

var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World bingo azure 2\n');
}).listen(port);