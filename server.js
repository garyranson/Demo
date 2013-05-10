process.env.AZURE_SERVICEBUS_NAMESPACE= "peractodev";   
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";
var http = require('http');
var azure = require('azure');

var serviceBusService = azure.createServiceBusService();

serviceBusService.createQueueIfNotExists('testqueue3', function(error){
    if(!error){
        // Queue exists
    }
});

var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
	var message = {
		body: 'Test message :',
		customProperties: {testproperty: 'TestValue'}
	};
	serviceBusService.sendQueueMessage('testqueue', message, function(error){
		if(!error){
			// message sent
		}
	}
	);
	
	res.end('Hello World bingo azure 2 with q3\n');

  
}).listen(port);