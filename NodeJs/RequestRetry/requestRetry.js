var request = require('requestretry')


request({
    method: 'GET',
    maxAttempts: 500,
    retryDelay: 3000,
    url: 'http://google.com'

}, function(err, response, body) {
    if (err) {

        console.log(err)

    } else {
        if (response.attempts > 1) {
            console.log('Se intento mas de una vez este mensaje : ' + response.attempts + '  ' + body);
        }
        console.log(response.statusCode);
    }
})
