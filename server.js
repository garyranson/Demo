process.env.AZURE_SERVICEBUS_NAMESPACE= "peractodev";   
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";

process.env.AZURE_STORAGE_ACCOUNT="peractodata";
process.env.AZURE_STORAGE_ACCESS_KEY="on6JPdBRLixpYWToe+jZ/rZ4RmDcDEwPLt+0sZidws57ZzfzaOTrT1FKKunbaWiBs/aE9qJy0tj83rO4WoybPQ==";

console.log("Here1");

var http = require('http');
var azure = require('azure');

console.log("Got requires");

var queueService = azure.createQueueService();

console.log("Created service");


queueService.createQueueIfNotExists("testqueue", function(error){
    if(!error){
console.log("Queue already exists");
    }
});

var port = process.env.PORT || 1337;

http.createServer(function(req, res) {

	var body = "";
console.log("New Request");
	req.on('data', function (chunk) {
		body += chunk;
		console.log("Chunk");
	});
	req.on('end', function () {
		var message = {
			body: body,
			customProperties: {requestUrl: req.url}
		};
		console.log("Sneding");
		queueService.createMessage(queueName, message, function(error){
			if(!error){
				console.log("Inserted");
			}
		});		
		console.log("Response");
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('loaderio-493151bc95c1d6ef3d271b97e6823007');
	});
}).listen(port);


/*
var serviceBusService = azure.createServiceBusService();

serviceBusService.createQueueIfNotExists('testqueue3', function(error){
    if(!error){
        // Queue exists
    }
});

http.createServer(function(req, res) {

	var body = "";
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		var message = {
			body: body,
			customProperties: {requestUrl: req.url}
		};
		serviceBusService.sendQueueMessage('testqueue', message, function(error){
			if(!error){
				// message sent
			}
		}
		);
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('loaderio-493151bc95c1d6ef3d271b97e6823007');
	});
}).listen(port);
*/