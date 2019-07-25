var http = require('http');
var os = require('os');
var fs = require('fs');
const exec = require('child_process').exec;

function method(path) {
	var stdPath = '/Users/abirahammed/Projects/WebStatic'
	console.log("reading from file: " + stdPath + path);
	fs.readFile('/Users/abirahammed/Projects/WebStatic/abir.github.io/html/index.html', 'utf8', function(err, contents) {
		console.log("Printing contents: "+contents);
		return contents;
	});
}
function onRequest( request, response) {
		var type = request.url.split("?")[0].split("/")[request.url.split("?")[0].split("/").length - 1].split(".")[1]
		console.log("The url: "+ request.url);
		console.log("Type: "+ type);

		if (type == 'html') {
			res = method(request.url)
			console.log(res);
			response.writeHead(200, {'Content-Type': 'text/html'});
			if (res == "ERROR") {
				response.writeHead(404);
				response.write('<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title>404</title></head><body><p>File not found</p></body></html>');
			}
			else {
				response.write(res);
			}
		}
		else if (type == 'cgi') {
			exec(request.url, (err, stdout, stderr) => {
			  if (err) {
			    console.error(err);
			    return;
			  }
				response.writeHead(200, {'Content-Type': 'text/html'});
				// console.log(stdout);
				console.log("Here");
				response.write(stdout);
				response.end();
				console.log("there");
			});
		}else {
			response.writeHead(200,{'Content-Type': 'text/'+type});
			fs.readFile(request.url, null, function(error, data){
				if (error){
					response.writeHead(404);
					response.write('<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title>404</title></head><body><p>File not found</p></body></html>');
				}else {
					response.write(data);
				}
				response.end();
			});
		}
}

http.createServer(onRequest).listen(8080,os.hostname());
console.log('Server running at http://'+os.hostname()+':8080/');
