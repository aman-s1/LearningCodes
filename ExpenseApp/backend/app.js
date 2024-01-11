const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const checkRoutes = require('./routes/checkpremium');
const premiumFeatureRoutes = require('./routes/premiumFeature');

const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');

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
app.use('/checkpremium',checkRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumFeatureRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));