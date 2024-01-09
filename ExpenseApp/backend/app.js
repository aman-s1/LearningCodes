const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const User = require('./models/users');
const Expense = require('./models/expenses');

const app = express();
const dotenv = require('dotenv');

const helmet = require('helmet');

app.use(helmet());

dotenv.config();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));

app.use(express.json());
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));