var qpdf = require('node-qpdf');

var options = {
    keyLength: 128,
    password: 'demo123'
}

//qpdf.decrypt('businesscard.pdf', 'demo1', '/Users/aaronluna/Documents/Code_Library_2/NodeJs/HTML2PDF/businesscard.pdf');
qpdf.encrypt('/Users/aaronluna/Documents/Code_Library_2/NodeJs/HTML2PDF/businesscard.pdf', options);