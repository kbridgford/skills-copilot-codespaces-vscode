// create a web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments.json');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = '.' + q.pathname;
  if (filename == './') filename = './index.html';
  if (filename == './index.html') {
    var commentsString = JSON.stringify(comments);
    var commentsScript = 'var comments = ' + commentsString + ';';
    var commentsScriptPath = path.join(__dirname, 'comments.js');
    fs.writeFileSync(commentsScriptPath, commentsScript);
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
console.log('Server running at http://localhost:8080/');
// vim: set syntax=javascript: