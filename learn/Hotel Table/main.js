const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');

window.loadData();

submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const price = form.elements['price'];
    const name = form.elements['dishname'];
    const table = form.elements['table'];
    
    const order = {
        price: price.value,
        name: name.value,
        table: table.value
    };

    try {
        const result = await axios.post("https://crudcrud.com/api/eb5c60ae3c8a40e1bff107c5aa02e7b4/orders", order);
        toshow(result.data);
    } catch (err) {
        console.log(err);
    }

    price.value = '';
    name.value = '';
    table.value = '';
});

async function loadData() {
    try {
        const result = await axios.get("https://crudcrud.com/api/eb5c60ae3c8a40e1bff107c5aa02e7b4/orders");
        result.data.forEach(element => {
            show(element);
            console.log(element);
        });
    } catch (err) {
        console.log(err);
    }
}

function show(obj) {
    const tableId = obj.table.toLowerCase();
    const parentElem = document.getElementById(tableId + 'items');
    const childElem = document.createElement('li');

    const delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete Order'));

    childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;
    childElem.appendChild(delBtn);
    parentElem.appendChild(childElem);

    delBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await axios.delete("https://crudcrud.com/api/eb5c60ae3c8a40e1bff107c5aa02e7b4/orders/" + obj._id);
            console.log("data deleted for" + obj.name);
        } catch (err) {
            console.log(err);
        }
        const li = e.target.parentElement;
        parentElem.removeChild(li);
    });
}

async function toshow(obj) {
    const selectedTable = document.getElementById('table').value.toLowerCase();
    const parentElem = document.getElementById(selectedTable + 'items');
    const childElem = document.createElement('li');

    const delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete Order'));

    childElem.textContent = obj.price + ' - ' + obj.name + ' - ' + obj.table;
    childElem.appendChild(delBtn);
    parentElem.appendChild(childElem);

    delBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await axios.delete("https://crudcrud.com/api/eb5c60ae3c8a40e1bff107c5aa02e7b4/orders/" + obj._id);
            console.log("data deleted for" + obj.name);
        } catch (err) {
            console.log(err);
        }
        const li = e.target.parentElement;
        parentElem.removeChild(li);
    });
}