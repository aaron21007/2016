var dns = require('dns');


let domain = 'gmail.com'


valida(domain).then(data=>{
    console.log(data);
    
}).catch(err=>{
  console.error(`Que - ${err}`);
  
})

async function valida(domain){
  let resolveCentinela =false, mxCentinela = false

  return new Promise(async (resolve, reject)=>{
        console.log(`${resolveCentinela} - ${mxCentinela}`);

        dns.resolve4(domain, function (err, addresses) {
          if (err) {
            console.error('********');
            console.error(err);
            console.error('********');
            return reject("No existe el dominio")
          }
          console.log('addresses: ' + JSON.stringify(addresses));
          addresses.forEach(async function (a) {
            await dns.reverse(a, function (err, hostnames) {
              if (err) {
                console.error('------');
                console.error(err);
                console.error('------');
                return reject("No existe el dominio")
              }
              console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
            });
          });
        });

        dns.resolve(domain, 'MX', function (err, addresses) {
          if (err) {
            console.log('No MX existente');
            return reject("MX no existe")
          } else if (addresses && addresses.length > 0) {
            console.log('Si Existe');
          }
        })
  })

}