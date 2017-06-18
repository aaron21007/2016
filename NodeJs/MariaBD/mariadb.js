var Client = require('mariasql');



for (var i = 0; i < 1000; i++) {
  var c = new Client({
    host: '148.243.86.45',
    user: 'maria_remote',
    password: '123456$#',
    db: 'NODE_ANDROID'
  });

  c.query('SELECT count(*) data FROM sms_transaction WHERE status_message_update = \'no_actualizado\' AND status_message <>\'por_enviar\' order by date_entry asc;', function(err, rows) {
    if (err){
        console.error('--------> Error: '+err);
    }else{
        console.log(rows);
    }
  });

  c.end();
}
