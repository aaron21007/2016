var request = require('request'); //bash: npm install request
// URL for request POST /message
var url = 'https://foo.chat-api.com/message?token=83763g87x';
var data = {
    phone: '79995253422', // Receivers phone
    body: 'Hello, Andrew!', // Сообщение
};
// Send a request
request({
    url: url,
    method: "POST",
    json: data
});
