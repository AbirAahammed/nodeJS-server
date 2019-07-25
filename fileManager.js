var fs = require('fs');

var stdPath = '/Users/abirahammed/Projects/WebStatic/'

fs.readFile('/Users/abirahammed/Projects/WebStatic/abir.github.io/html/index.html', 'utf8', function(err, contents) {
    console.log(contents);
});

// console.log('after calling readFile');
