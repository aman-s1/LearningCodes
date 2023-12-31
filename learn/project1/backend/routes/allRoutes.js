const express = require('express');
const { insertData, createTable, getTableData, getAllTables, deleteTableData, deleteTable} = require('../controllers/routeController');

const route = express.Router();

route.post('/createTable', createTable)

route.post('/insertData', insertData);

route.get('/getAllData/:tableName', getTableData)

route.get('/getTables', getAllTables)

route.delete('/deleteEntry/:tableName/:id', deleteTableData)

route.delete('/deleteTable/:tableName', deleteTable)

module.exports = route;