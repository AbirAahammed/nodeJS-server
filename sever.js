var http = require('http');
var fs = require('fs');
function onRequest( request, response) {
		console.log("The url: "+ request.url);
		response.writeHead(200,{'Content-Type': 'text/html'});
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

http.createServer(onRequest).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
