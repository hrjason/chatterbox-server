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
  // // if(request.method === 'POST') {
  // //   if(request.url ==='/send') {
  // //     // you're cool
  // //     statusCode = 201;
  // //     response.writeHead(statusCode, headers);
  // //     response.end('POST succeed');
  // //   } else {
  // //     // you're not cool
  // //     statusCode = 404;
  // //     response.writeHead(statusCode, headers);
  // //     response.end('POST fail');

  // //   }
  // } else if(request.method === 'GET') {
  //   if(request.url === '/classes/messages') {
  //     // you're cool
  //     statusCode = 200;
  //     console.log('in get request');
  //     response.writeHead(statusCode, headers);
  //     response.end('GET succeed');
  //   } else {
  //     // your mom is cool
  //     statusCode = 404;
  //     console.log('404');
  //     response.writeHead(statusCode, headers);
  //     response.end('GET fail');
  //   }
  // } else if (request.method === "OPTIONS") {
  //   console.log("here!");
  //   statusCode = 200;
  //   // headers["'Allow'"] = 'GET,POST,OPTIONS';
  //   console.log(statusCode, headers);
  //   response.writeHead(statusCode, headers);
  //   response.end();
  // } else {
  //   // you're fucked
  //   statusCode = 404;
  //   response.writeHead(statusCode, headers);
  //   response.end('Fail fail');
  // }
  // if(request.url === '/classes/messages') {
  //   response.end(JSON.stringify({results : []}));
  // } else if (request.url === '/send') {
  //   // response.end(JSON.stringify({result: []}));
  //   // request.on('data', function(data) {
  //   //   console.log("it works!");
  //   // });
  //   response.end();
  //   console.log("in /send");
  //   console.log(request.headers);
  //   response.end('end of /send');

  // } else {
  //   response.end('messed out');
  // }

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;

