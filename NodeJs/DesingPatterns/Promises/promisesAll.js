var p1 = new Promise((resolve, reject) => {
    setTimeout(
        function() {
            // ¡Cumplimos la promesa!
            resolve('Tiempo 1');
        }, Math.random() * 2000 + 1000);
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(
        function() {
            // ¡Cumplimos la promesa!
            resolve('Tiempo 2');
        }, Math.random() * 2000 + 1000);
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(
        function() {
            // ¡Cumplimos la promesa!
            resolve('Tiempo 3');
        }, Math.random() * 2000 + 1000);
});
var p4 = new Promise((resolve, reject) => {
    setTimeout(
        function() {
            // ¡Cumplimos la promesa!
            resolve('Tiempo 4');
        }, Math.random() * 2000 + 1000);
});
var p5 = new Promise((resolve, reject) => {
    //reject("reject");
    resolve('resolve')
});



Promise.all([p1, p2, p3, p4, p5]).then(values => {
    console.log(values);
}).catch(reason => {
    console.log(reason)
});
