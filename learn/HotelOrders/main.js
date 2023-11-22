const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');

window.loadData();

submitBtn.addEventListener('click',function(e) {
    e.preventDefault();
    const price = form.elements['price'];
    const name = form.elements['dishname'];
    const table = form.elements['table'];
    
    const order = {
        price : price.value,
        name : name.value,
        table : table.value
    };
    https://crudcrud.com/api/6c6551816dd545368a5dbfcf8b03cfc8
    axios.post("https://crudcrud.com/api/6c6551816dd545368a5dbfcf8b03cfc8/orders", order).then((result) => {
        
        toshow(result.data);
    }).catch((err) => {
     console.log(err);   
    });


    price.value = '';
    name.value = '';
    table.value = '';
});
function loadData() {
    axios.get("https://crudcrud.com/api/6c6551816dd545368a5dbfcf8b03cfc8/orders").then((result) => {
        result.data.forEach(element => {
            toshow(element);        
            console.log(element);
        });
    
   
}).catch((error) => console.log(error));

}


                                                
          // show data on DOM
function toshow(obj){

if(document.getElementById('table').value === 'table1')
{
    const parentElem = document.getElementById('table1items');
    const childElem = document.createElement('li');

//    DELETE BUTTON
var deltebtn = document.createElement('button');
deltebtn.appendChild(document.createTextNode('Delete'));

childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;

childElem.appendChild(deltebtn);

//    // add in li
parentElem.appendChild(childElem);


// delte button function
deltebtn.addEventListener('click', (e)=> {
  e.preventDefault();

  //deleting data from row

 axios.delete("https://crudcrud.com/api/6c6551816dd545368a5dbfcf8b03cfc8/orders/" + obj._id)
 .then((result)=>
 {  
    // console.log(result);
    console.log("data deleted for " + obj.name);
    })
 .catch((error)=>console.log(error));
  var li = e.target.parentElement;
  parentElem.removeChild(li);

});

}
else if(document.getElementById('table').value === 'table2')
{
    const parentElem = document.getElementById('table2items');
    const childElem = document.createElement('li');

//    DELETE BUTTON
var deltebtn = document.createElement('button');
deltebtn.appendChild(document.createTextNode('Delete'));

childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;

childElem.appendChild(deltebtn);

//    // add in li
parentElem.appendChild(childElem);


// delte button function
deltebtn.addEventListener('click', (e)=> {
  e.preventDefault();

  //deleting data from row

 axios.delete("https://crudcrud.com/api/6c6551816dd545368a5dbfcf8b03cfc8/orders/" + obj._id)
 .then((result)=>
 {  
    // console.log(result);
    console.log("data deleted for " + obj.name);
    })
 .catch((error)=>console.log(error));
  var li = e.target.parentElement;
  parentElem.removeChild(li);

});

}
else
{
    const parentElem = document.getElementById('table3items');
    const childElem = document.createElement('li');

//    DELETE BUTTON
var deltebtn = document.createElement('button');
deltebtn.appendChild(document.createTextNode('Delete'));

childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;

childElem.appendChild(deltebtn);

//    // add in li
parentElem.appendChild(childElem);


// delte button function
deltebtn.addEventListener('click', (e)=> {
  e.preventDefault();

  //deleting data from row

 axios.delete("https://crudcrud.com/api/6c6551816dd545368a5dbfcf8b03cfc8/orders/" + obj._id)
 .then((result)=>
 {  
    // console.log(result);
    console.log("data deleted for " + obj.name);
    })
 .catch((error)=>console.log(error));
  var li = e.target.parentElement;
  parentElem.removeChild(li);

});

}
}
