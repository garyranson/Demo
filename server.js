var http = require('http'),
	azure = require('azure'),
	async = require('async'),
	env   = require('./package.json'),
	port = process.env.port || 1337;

var queueId = 0,
 	serviceBusService = azure.createServiceBusService("Endpoint=sb://peractodev.servicebus.windows.net/;SharedSecretIssuer=owner;SharedSecretValue=F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ="),
 	queues = ["testqueue","testqueue2","testqueue3","testqueue4"],
 	queuelength = queues.length;

function ServerRequest(req,res) {

	var body = "";

	queueId=(queueId+1)%queuelength;

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

			SendMessage(queues[queueId],message,0,res);
		}
	);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end("loaderio-493151bc95c1d6ef3d271b97e6823007");

}

function SendMessage(queueName,message,iteration,res) {

	serviceBusService.sendQueueMessage(queueName, message, 
		function(error){
			if(!error) {
/*				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end();
*/			}
			else if(iteration>=4) {
/*				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end();
*/			}
			else {
		/*		setTimeout(function() {SendMessage(queueName,message,iteration+1,res);},100*(iteration+1));*/
			}
		}
	);
}

// Check all the queues, start if there are no failures
async.forEach(queues, 
	function(queue, callback) { 
		//console.log('Checking Queue: '+queue);
		serviceBusService.createQueueIfNotExists(queue,callback);
	}, 
	function(err) {
		if(!err) 		{
		//	console.log('Listener Started ');
			http.createServer(ServerRequest).listen(port);
		}
	}
);
