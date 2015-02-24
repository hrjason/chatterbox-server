/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  if(request.method === 'POST') {
    if(request.url ==='/send') {
      // you're cool
      statusCode = 201;
      response.end('POST succeed');
    } else {
      // you're not cool
      response.end('POST fail');

    }
  } else if(request.method === 'GET') {
    if(request.url === '/classes/messages') {
      // you're cool
      statusCode = 200;
      response.end('GET succeed');
    } else {
      // your mom is cool
      response.end('GET fail');
    }
  } else {
    // you're fucked
    statusCode = 404;
    response.end('Fail fail');
  }

  // // The outgoing status.
  // var statusCode;
  // if(request.url === '/send'){
  //   statusCode = 201;
  // } else {
  //   statusCode = 200;
  // }

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);


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


};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;

