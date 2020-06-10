var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./carta.html', 'utf8');
var options = {
    format: 'Letter'
};

var buf = Buffer.from(`<p><img alt=""
    src="https://editor-voices.com.mx/uploads/images/58217d31df0e5dfe13792f5ab67f9e67/20190923120352-citamonterrey-min.jpg"
    style="height:auto; width:100%" /></p>`, 'utf8');
var bo = `<p><img alt=""
    src="https://editor-voices.com.mx/uploads/images/58217d31df0e5dfe13792f5ab67f9e67/20190923120352-citamonterrey-min.jpg"
    style="height:auto; width:100%" /></p>`

console.log(html);
console.log('-------');
console.log(buf);




pdf.create(bo, options).toFile('./businesscardBuffer.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});

pdf.create(bo).toBuffer(function (err, buffer) {
    console.log('This is a buffer:', Buffer.isBuffer(buffer));
});