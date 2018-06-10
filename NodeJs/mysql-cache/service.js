const MysqlCache = require('mysql-cache')
var sleep = require('sleep');

const mysql = new MysqlCache({
  host: 'localhost',
  user: 'root',
  password: 'escom123',
  database: 'Filipinas',
  cacheProvider: 'LRU',
})

mysql.connect(err => {
  if (err) {
    throw err // Catch any nasty errors!
  }
  console.log('W00t! i\'m connected!!')

  // Lets run some queries now!
  f1()
  console.log(`Pausa de 5 segundos`);
  //sleep.sleep(5)

})



// f2()
//

 function f1(){
  console.log(`Haciendo query una vez`);
   mysql.query({
    sql: 'SELECT sum(billsec), sum(duration),  disposition FROM cdr group by disposition;',
    params: [1, 5],
  }, (err, res, cache) => {
    if (err) {
      throw new Error(err)
    }
    // This query was retrieved from the cache because it was the
    // exact same sql code, which was much faster call!
    console.log(res);

    console.log(cache.isCache === true) // Should be true :)

    // Do something with the results

  })
}

 function f2(){
  console.log(`Haciendo query 2da vez`);
   mysql.query({
    sql: 'SELECT sum(billsec), sum(duration),  disposition FROM cdr group by disposition;',
    params: [1, 5],
  }, (err, res, cache) => {
    if (err) {
      throw new Error(err)
    }
    // This query was retrieved from the cache because it was the
    // exact same sql code, which was much faster call!
    console.log(res);

    console.log(cache.isCache === true) // Should be true :)

    // Do something with the results
  })
}
