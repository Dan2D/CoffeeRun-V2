const fs = require('fs');
const extract = require('./extract');



function errorHandler(err, res) {
    filePath = extract('/404.html');
    fs.readFile(filePath, function (err, data) {
        res.writeHead(404);
        res.end(data);
    });
};

var readFile = function (filePath, res, extType) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            errorHandler(err, res);
            return;
        } else {
            res.setHeader('Content-Type', extType);
            res.end(data);
        }
    })
};

module.exports = readFile;