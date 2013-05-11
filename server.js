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

var postHTML = 
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Input 1: <input name="input1"><br>' +
  'Input 2: <input name="input2"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

var port = process.env.PORT || 1337;
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
		res.end('Thanks\n');
	});

	

  
}).listen(port);