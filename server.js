var http = require('http');
var azure = require('azure');
var port = process.env.port || 1337;
 
var i = 0;

process.env.AZURE_SERVICEBUS_NAMESPACE= "peractodev";   
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";

var serviceBusService = azure.createServiceBusService();

function ServerRequest(req,res) {

	var body = "";

	i=(i+1)%2;
	var queueName = i==0?"testqueue":"testqueue3";
	//console.log("Reuested");
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

			SendMessage(queueName,message,0);
		}
	);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('loaderio-45271b42060869e24ca2e20e94897a04');
}

function SendMessage(queueName,message,iteration) {

	//console.log("SendMessage");

	serviceBusService.sendQueueMessage(queueName, message, 
		function(error){
			if(error){
				if(iteration<4){
					console.log("ResendMessage");
					setTimeout(function() {
						SendMessage(queueName,message,iteration+1);
					},1000);
				}
			}
		}
	);
}

http.createServer(ServerRequest).listen(port);