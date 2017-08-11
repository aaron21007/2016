var tty = require('tty.js');

var app = tty.createServer({
	  //shell: 'bash',
	  // users: {
		//       foo: 'bar'
		//     },
	  port: 9000,
		shell: "bashM",
});

console.log(process.env);

app.listen();
