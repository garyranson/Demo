process.env.AZURE_SERVICEBUS_NAMESPACE= "peractodev";   
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";

var http = require('http');
var azure = require('azure');

var port = process.env.PORT || 1337;

var serviceBusService = azure.createServiceBusService();

function ServerRequest(req,res) {

	var body = "";
	
	req.on('data', 
		function (chunk) {
			body += chunk;
		}
	);
	
	req.on('end', 
		function () {
			var message = {
				body: body,
				customProperties: {requestUrl: req.url}
			};
			
			serviceBusService.sendQueueMessage('testqueue', message, 
				function(error){
					if(!error){
						// message sent
					}
				}
			);
			
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('loaderio-493151bc95c1d6ef3d271b97e6823007');
		}
	);
}

http.createServer(ServerRequest).listen(port);
