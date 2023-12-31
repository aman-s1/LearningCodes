const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const route = require('./routes/allRoutes');

const app = express();

const appRoutes = require('./routes/createDatabase');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs');

app.use('/',route);

app.listen(3000);