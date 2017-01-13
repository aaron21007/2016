var inventory = [{
    name: 'apples',
    quantity: 2
}, {
    name: 'bananas',
    quantity: 0
}, {
    name: 'cherries',
    quantity: 5
}];

function findInArray(array, search) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === fruit)
            return true;
    }
    return false;
}

console.log(findCherries(inventory, 'cherries'));
