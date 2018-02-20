var http = require('http');
var fs = require('fs');
var storage = require('azure-storage');

var queueService;

fs.readFile(__dirname + '/../local.settings.json', function(error, content) {
    if(error) {
        console.log(error);
    } else {
        var settings = JSON.parse(content);
        queueService = storage.createQueueService(settings.Values.AzureWebJobsStorage);

        queueService.createQueueIfNotExists('comments', function(error) {
          if (error) {
            console.log(error);
          }
        });
    }
});

http.createServer(function (request, response) {

    if(request.url.indexOf('hook') > -1 && request.method === 'POST') {

        var body = '';
        
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var message = JSON.parse(body);

            queueService.createMessage('comments', new Buffer(JSON.stringify(message)).toString('base64'), function(error) {
              if (error) {
                console.log(error);
                response.writeHead(500);
                response.end('Sorry :( ' + error.code);
                response.end();
              } else {
                response.writeHead(200, { 'Content-Type': 'application/json'});
                response.end("Success", 'utf-8');
              }
          });
        });
        
    } else {
        fs.readFile( __dirname + '/../web/index.html', function(error, content) {
            if (error) {
                console.log(error);
                response.writeHead(500);
                response.end('Sorry :( ' + error.code);
                response.end();
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            }
        });
    }

}).listen(process.env.PORT || 3000);;
