var async = require('async')



function dale(i, j){
    if(i==j){
        return 0;
    }else{
        async.waterfall([
            function(callback) {

                setTimeout(function() {
                    console.log('Paso 1');
                    callback(null, 'one', 'two');
                }, 2000);
            },
            function(arg1, arg2, callback) {
                // arg1 now equals 'one' and arg2 now equals 'two'
                setTimeout(function() {
                    console.log('Paso 2');
                    callback(null, 'three');
                }, 2000);

            },
            function(arg1, callback) {
                // arg1 now equals 'three'
                setTimeout(function() {
                    console.log('Paso 3');
                    callback(null, 'done');
                }, 2000);

            }
        ], function(err, result) {
            console.log('FINAL');
            dale(i+1, j)
        });
    }

}

function enums(start,end,callback) {
   callback(start);
   if (end == 1)
      return 1;
   else{
      return enums(start + 1, end - 1, callback);
   }
}

enums(1,10,function (number){
  console.log(number);
});

//setTimeout(function(){ console.log("Rick"); }, 0);

//dale(0, 25000)
