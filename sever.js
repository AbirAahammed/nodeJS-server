var http = require('http');
var os = require('os');
var fs = require('fs');
function onRequest( request, response) {
		var type = request.url.split("?")[0].split("/")[request.url.split("?")[0].split("/").length - 1].split(".")[1]
		console.log("The url: "+ request.url);
		console.log("Type: "+ type);
		response.writeHead(200,{'Content-Type': 'text/'+type});
		fs.readFile(request.url, null, function(error, data){
			if (error){
				response.writeHead(404);
				response.write("FIle not found");
			}else {
				response.write(data);
			}
			response.end();
		});
}

http.createServer(onRequest).listen(os.hostname(),8080);
console.log('Server running at http://'+os.hostname()+':8080/');
