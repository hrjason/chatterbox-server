/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var results = [];

var page;
var fs = require('fs');
fs.readFile ('../client/index.html', function(err, html){
  page = html;
});

var css;
var fs = require('fs');
fs.readFile ('../client/styles/styles.css', function(err, page){
  css = page;
});

var requestMethods = {
  POST : function(request, response, headers) {
    // make sure POST reqest sent to correct URL
    if(request.url ==='/send' || request.url === '/classes/room1') {
      response.writeHead(201, headers);

      // get data from request object
      var newMessage = "";
      request.on('data', function(data){
        newMessage += data;
      });

      // when data finished, add object to results array
      request.on('end', function(){
        results.push(JSON.parse(newMessage));
      });
      response.end(); // always end a response

    } else {
      response.writeHead(404, headers);
      response.end();
    }
  },
  GET  : function(request, response, headers) {
    // make sure GET request is to correct URL
    if(request.url === '/classes/messages' || request.url === '/classes/room1') {
      response.writeHead(200, headers);
      response.end(JSON.stringify({results:results}));
    } else if (request.url === '/') {
      headers['Content-Type'] = "text/html";
      response.end(page);
    } else if (request.url === '/styles/styles.css') {
      headers['Content-Type'] = "text/css";
      response.end(css);
    }

    else {
      response.writeHead(404, headers);
      response.end('GET fail');
    }
  },
  OPTIONS : function(request, response, headers) {
    response.writeHead(200, headers);
    response.end();
  }
};

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  // Set default header values
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  var statusCode;
  requestMethods[request.method](request, response, headers);

};

exports.requestHandler = requestHandler;

