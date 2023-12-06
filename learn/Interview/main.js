studentobj = {
    'yash': 26,

    'vaibhav': 24,
    
    'rajesh' : 25,
}
let age = 29;
let flag = false;
let data = Object.entries(studentobj);
for(let item of data)
{
    if(age === item[1])
    {
        console.log(item[0]);
        flag = true;
    }
}
if(flag === false)
{
    console.log(-1);
}
const obj= {

    "key1": "value1",
    
    "key2" : "value2",
    
    "key3" : "value3"
    
    }
    
    const obj2 = { ...obj}
    
    console.log(obj2 === obj)