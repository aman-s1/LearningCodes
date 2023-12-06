const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');

window.loadData();

submitBtn.addEventListener('click',function(e){
    e.preventDefault();
    const price = form.elements['price'];
    const name = form.elements['dishname'];
    const table = form.elements['table'];

    const order = {
        price : price.value,
        name : name.value,
        table : table.value
    };
    axios.post("https://crudcrud.com/api/fc4f9f3cea644427a0120e5dccfd8e37/orders",order).then((result) => {
        toshow(result.data);
        }).catch((err) => {
            console.log(err);
        });

        price.value = '';
        name.value = '';
        table.value = '';
    });

    function loadData(){
        axios.get("https://crudcrud.com/api/fc4f9f3cea644427a0120e5dccfd8e37/orders").then((result) => {
            result.data.forEach(element => {
                show(element);
                console.log(element);
            });
        }).catch((err) => console.log(err));
    }
function show(obj){
    const tableId = obj.table.toLowerCase();
    const parentElem = document.getElementById(tableId + 'items');
    const childElem = document.createElement('li');

    const delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete Order'));

    childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;
    childElem.appendChild(delBtn);
    parentElem.appendChild(childElem);

    delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        axios.delete("https://crudcrud.com/api/fc4f9f3cea644427a0120e5dccfd8e37/orders/" + obj._id).then((result) => {
            console.log("data deleted for" + obj.name);
        }).catch((err) => console.log(err));
    var li = e.target.parentElement;
    parentElem.removeChild(li);
    });
}
function toshow(obj){
    const selectedTable = document.getElementById('table').value.toLowerCase();
    const parentElem = document.getElementById(selectedTable + 'items');
    const childElem = document.createElement('li');

    const delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete Order'));

    childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;
    childElem.appendChild(delBtn);
    parentElem.appendChild(childElem);

    delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        axios.delete("https://crudcrud.com/api/fc4f9f3cea644427a0120e5dccfd8e37/orders/" + obj._id).then((result) => {
            console.log("data deleted for" + obj.name);
        }).catch((err) => console.log(err));
    var li = e.target.parentElement;
    parentElem.removeChild(li);
    });
}