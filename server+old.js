process.env.AZURE_SERVICEBUS_NAMESPACE= "peractodev";   
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "F9BtX9MXwJYQ2vc4G+GbGeYHn5lrn7UOPVXPRxhMOVQ=";

process.env.AZURE_STORAGE_ACCOUNT = "peractodata";   
process.env.AZURE_STORAGE_ACCESS_KEY = "on6JPdBRLixpYWToe+jZ/rZ4RmDcDEwPLt+0sZidws57ZzfzaOTrT1FKKunbaWiBs/aE9qJy0tj83rO4WoybPQ==";


var http = require('http');
var azure = require('azure');
var moment  = require('moment');

var port = process.env.PORT || 1337;

//var serviceBusService = azure.createServiceBusService();
var queueService = azure.createQueueService();
var queueName = "storagequeue";

queueService.createQueueIfNotExists(queueName, function(error){
    if(!error){
        console.log("Created");
    }
});

queueService.createMessage(queueName, "Hello world!", function(error){
    if(!error){
        console.log("Message Sent");
    }
});


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

			var queueName = (Math.floor((Math.random()*10)+1)>=4)?"testqueue":"testqueue3";
			
			SendMessage(queueName,message,0);
		}
	);
console.log('return');
	
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('loaderio-493151bc95c1d6ef3d271b97e6823007');
}

function SendMessage(queueName,message,iteration) {
console.log('sending');
	serviceBusService.sendQueueMessage(queueName, message, 
		function(error){
			console.log('complte:'+iteration);
			if(error){
				if(iteration<4)
					SendMessage(queueName,message,iteration+1);
			}
		}
	);
}



//http.createServer(ServerRequest).listen(port);
	