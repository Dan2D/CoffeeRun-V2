const http = require('http');
const fs = require('fs'); //node file system
const path = require('path');
const extract = require('./extract');
const read = require('./read');
const mime = require('mime');



var server = http.createServer(function (req, res) {
    var extType = mime.getType(req.url);
    var filePath = extract(req.url);
    read(filePath, res, extType);
});

server.listen(3000);