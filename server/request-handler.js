/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var headers = {
  "Access-Control-Allow-Origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var obj = {};
obj.results = [];

var requestBody;    



var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url); 

  // GET REQUEST
  if(request.method === 'GET'){
    if(request.url === '/classes/messages' || request.url === '/') { // NPM TEST URL
      response.writeHead(200, headers);
      response.end(JSON.stringify(obj));

    } else { // URL NOT FOUND
      response.writeHead(404, headers);
      console.log('404');
      response.end();
    }
  } 
  // POST REQUEST
  else if (request.method === 'POST') {
    if(request.url === '/classes/messages' || request.url === "/") { // NPM TEST URL
      response.writeHead(201, headers);
      request.on('data', function(data) {
        // data.toString is to get out of the buffer object
        requestBody = data.toString();
        // requestBody is an object
        obj.results.push(JSON.parse(requestBody));
        var body = JSON.stringify(obj);
        response.end(body);
      });
    } else { // URL NOT FOUND
      response.writeHead(404, headers);
      console.log('404');
      response.end();
    }
  } 
  // OPTIONS REQUEST
  else if (request.method === "OPTIONS") {
    response.writeHead(200, headers);
    response.end(JSON.stringify(obj));
  } 
};

module.exports = requestHandler;


