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
const student = {
    name : 'Aman',
    age : '23',
    occupation : 'Salaried',
    greet : function(){
        console.log("hi, my name is "+ this.name);
    }
}
const print = async() => {
    await delay(5000);
    student.greet();
};
print();
const initialAmount = 600000; // 6 lakh rupees
const futureValue = 200000000; // 10 crore rupees
const growthRate = 0.3; // 30% per year

const numberOfYears = Math.ceil(
  Math.log((futureValue * growthRate / initialAmount) + 1) /
  Math.log(1 + growthRate)
);

console.log(`It will take approximately ${numberOfYears} years to save 20 crore rupees.`);
