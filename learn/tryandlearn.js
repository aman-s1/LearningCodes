const fruits = ['apple','oranges','','mango','','lemon'];
const transformed = fruits.map(item => {
    if(item === '')
    {
        return 'empty'
    }
    else
    {
        return item;
    }
});
console.log(transformed);

const obj1 = {'key1': 1, "key2": 2, "key3": 1000}
let { key1, key3} = obj1
key1 = 20;
key3 = 123
console.log(obj1.key1, obj1.key3)

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));
const printSequence = async() => {
    console.log('a');
    console.log('b');
    await delay(3000);
    console.log('c');
    await delay(1000);
    console.log('d');
    console.log('e');
};
printSequence();

