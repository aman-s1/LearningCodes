const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Expense = require('./models/expense');

const ExpenseController = require('./controllers/expenseController');

const app = express();
const PORT = 3000;

const expenseRoutes = require('./routes/expense');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/',expenseRoutes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});