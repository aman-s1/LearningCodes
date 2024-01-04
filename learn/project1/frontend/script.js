const addMoreFields = document.querySelector('#addMoreFields');
const fieldsContainer = document.querySelector('#fieldsContainer');
const createTableForm = document.querySelector('#createTableForm');

// for inserting data into table
const insertDataForm = document.querySelector('#insertDataForm');
const dataTableName = document.querySelector('#dataTableName').value;
const dataFieldName = document.querySelector('#dataFieldName');
const dataFieldValue = document.querySelector('#dataFieldValue');
const addDataBtn = document.querySelector('#addDataBtn');
// const addFieldsBtn = document.querySelector('#addFieldsBtn');
let dataFieldContainer = document.querySelector('#dataFieldContainer');

// displaying entities
const displayTable = document.querySelector('#displayTable');
const tableData = document.querySelector('#tableData');
// delte table entities
const deleteTableBtn = document.querySelector('#delete-table-btn');
const dropTableForm = document.querySelector('#tableDrop');

const dropTableBtn = document.querySelector('#droptabbtn');

deleteTableBtn.addEventListener('click', () => {
    dropTableForm.style.display = 'block' ;
});

const createTableBtn = document.querySelector('#create-table-btn');

createTableBtn.addEventListener('click', () => {
    createTableForm.style.display = 'block';
});

let fieldCount = 1;

addMoreFields.addEventListener('click', () => {
    const tableName = dataTableName;
    const tableHtml = `<div>
                        <br>
                        <label for="fieldName">Field Name:</label>
                        <input type="text" class="fieldName" required>

                        <label for="fieldType">Field Type:</label>
                        <select class="fieldType" required>
                        <option value="INT">INT</option>
                        <option value="VARCHAR(255)">VARCHAR(255)</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                        <option value="DATE">DATE</option>
                        </select>
                    </div>`;
    fieldsContainer.innerHTML += tableHtml;
    fieldCount++;
})


createTableForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const allFieldsName = document.querySelectorAll('.fieldName');
    const allFieldType = document.querySelectorAll('.fieldType');
    const tableName = document.querySelector('#tableName').value;

    const fields = [];
    //making object from entered fields
    for(let i=0;i<fieldCount;i++){
        const obj = {
            name : allFieldsName[i].value,
            type : allFieldType[i].value,
        }

        fields.push(obj);
    }

    axios.post('http://localhost:5000/createTable', { tableName, fields })
    .then((result) => { 
        getAllTables();
        alert(result.data.message);
    })
    .catch(err => {
        console.log(err);
        alert(err.error);
    })
    createTableForm.style.display = 'none';
})

addDataBtn.addEventListener('click', () => {
    const tableNameInput = document.querySelector('#dataTableName');
    const tableName = tableNameInput.value;

    axios.get(`http://localhost:5000/getTableFields/${tableName}`)
        .then(result => {

            if (result.data.message) {
                tableData.textContent = result.data.message;
                return;
            }

            const { fieldNames } = result.data;

            dataFieldContainer.innerHTML = '';
            let dataFieldsHtml = `<div>
                                    <br>
                                    ${fieldNames.map(ele => `
                                        <label for="${ele}" class="dataFieldName">${ele}</label>
                                        <input type="text" id="${ele}" class="dataFieldValue" required>
                                    `).join('')}
                                </div>`;
            dataFieldContainer.innerHTML += dataFieldsHtml;
        })
        .catch(err => console.log(err));
});


// insert data into table
insertDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tableName = document.querySelector('#dataTableName').value;
    const allFieldsNames = document.querySelectorAll('.dataFieldName');
    const allFieldsValues = document.querySelectorAll('.dataFieldValue');

    const fields = [];
    for (let i = 0; i < allFieldsNames.length; i++) {
        fields.push(allFieldsNames[i].textContent);
    }

    const values = [];
    for (let i = 0; i < allFieldsValues.length; i++) {
        values.push(allFieldsValues[i].value);
    }

    console.log(fields, values);

    axios.post('http://localhost:5000/insertData', { tableName: tableName, fields, values })
        .then(result => {
            alert(`Data inserted successfully`);
            getAllTableData(tableName);
        })
        .catch(err => console.log(err));
});



dropTableBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const delTableName = document.querySelector('#deleteTableName').value;

    axios.delete(`http://localhost:5000/deleteTable/${delTableName}`)
    .then(result => {
        getAllTables();
        alert(result.data.message);
    })
    .then( () => {
        dropTableForm.style.display = 'none' ;
    })
    .catch(err => console.log(err));
})

function getAllTableData(tableName) {
    axios.get(`http://localhost:5000/getAllData/${tableName}`)
        .then(result => {
            console.log(result);

            if (result.data.message) {
                tableData.textContent = result.data.message;
                return;
            }

            const { fields, data } = result.data;

            tableData.innerHTML = '';
            const tableDataHtml = `<hr>
                                <h3>${tableName}</h3>    
                                <table style='border-collapse: collapse; width: 100%; border: 2px solid black;'>
                                    <thead>
                                        <tr style='border: 2px solid black;'>${fields.map(ele => `<th style='border: 2px solid black;'>${ele}</th>`).join('')}</tr>
                                    </thead>
                                    <tbody>
                                        ${data.map(ele => 
                                            `<tr style='border: 2px solid black;'>${ele.map(currElem => `<td style='border: 2px solid black;'>${currElem}</td>`).join('')}
                                                <td style='border: 2px solid black;'><button style="background-color: white; color: blue;" onclick="deleteAnEntry('${tableName}', ${ele[0]})">Delete</button></td>
                                            </tr>`
                                        ).join('')}
                                    </tbody>
                                </table>`;
            tableData.innerHTML += tableDataHtml;
        })
        .catch(err => console.log(err))
}

function deleteAnEntry (tableName, id) {
    axios.delete(`http://localhost:5000/deleteEntry/${tableName}/${id}`)
    .then((result) => {
        alert(result.data.message);
        getAllTableData(tableName);
    })
    .catch(err => console.log(err))
}

function getAllTables () {
    axios.get('http://localhost:5000/getTables')
    .then(result => {
        console.log(result.data.tableNames);
        displayTable.innerHTML = '';
        result.data.tableNames.forEach(element => {
            const li = document.createElement('li');
            li.textContent = element;
            li.style.fontWeight = '600';
            li.style.cursor = 'pointer';
            li.style.textDecoration = 'underline';
            li.style.paddingBottom = '5px';
            li.addEventListener('click', () => getAllTableData(element));
            li.className = 'allTableName';
            displayTable.appendChild(li);
        });
    })
    .catch(err => console.log(err))
}

getAllTables();