var dns = require('dns');


let domain = 'cotema¡r.com.mx'




 function valida(domain){
 
    return new Promise((resolve, reject)=>{
         dns.resolve(domain, 'MX', function (err, addresses) {
           if (err) {
             return reject("MX NO EXISTE")
           } else if (addresses && addresses.length > 0) {
             return resolve("MX SI EXISTE")
           }else{
             return reject(" NO SE SABE MX NO EXISTE")
           }
         })
    })

}

valida(domain).then(data=>{
  console.log(data);
}).catch(err=>{
  console.error(err);
})