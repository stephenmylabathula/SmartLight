var http = require('http');
var fs = require('fs');
var url = require('url');
var m = require('mraa');


var led = new m.Gpio(9);
led.dir(m.DIR_OUT);

http.createServer( function (request, response) {  
    
   var pathname = url.parse(request.url).pathname;
   console.log("Request for " + pathname + " received.");
    
   switch(pathname){
       case "/index.htm":
            fs.readFile(__dirname + pathname, function (err, data) {
                if (err) {
                    console.log(err);
                    response.writeHead(404, {'Content-Type': 'text/html'});
                } else {	
                    response.writeHead(200, {'Content-Type': 'text/html'});	
                    response.write(data.toString());
                    if(led.read() == 0)
                        response.write("<br><img name=\"imgLight\" id=\"imgLight\" src=\"lightOff.jpg\" width=250 height=300/>");
                    else
                        response.write("<br><img name=\"imgLight\" id=\"imgLight\" src=\"lightOn.jpg\" width=250 height=300/>");
                }
                response.end();
            }); 
            break;
        case "/on":
           led.write(1);
           break;
        case "/off":
           led.write(0);
           break;
       default:
           console.log("none");
           response.writeHead(200, {'Content-Type': 'text/html'});
           fs.readFile(__dirname + pathname, function (err, data) {
                if (err) {
                    console.log(err);
                    response.writeHead(404, {'Content-Type': 'text/html'});
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});	
                    response.end(data);
                }
           });
   }
}).listen(9000);

// Console will print the message
console.log('Server @ http://[IP address]:9000/');