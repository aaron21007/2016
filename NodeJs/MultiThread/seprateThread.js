/*
*  File Name: seprateThread.js
*  Description: This is another thread
*/
const { parentPort } = require("worker_threads");
const getSum = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};


function sayHi(phrase, who) {
  console.log(`El delay fue de ${who}`);
}



parentPort.on("message", (limit) => {
let delay = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000
 setTimeout(sayHi, delay, "Hello", delay)
 parentPort.postMessage(delay);
});