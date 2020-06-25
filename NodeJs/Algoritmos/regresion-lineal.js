const regression =  require('regression')
const result = regression.linear([
  [1, 7000],
  [2, 9000],
  [3, 5000],
  [4, 11000],
  [5, 10000],
  [6, 13000]
]);

console.log(result);

const gradient = result.equation[0];
const yIntercept = result.equation[1];

