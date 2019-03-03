const path = require('path');

var extractFilePath = function (url) {
    var filePath;
    fileName = 'index.html';

    if (url.length > 1) {
        fileName = url.substring(1);
    }
    filePath = path.resolve(__dirname, fileName);
    filePath = path.normalize(filePath);
    return filePath;
};

module.exports = extractFilePath;