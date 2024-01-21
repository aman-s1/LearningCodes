const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./util/database');

const User = require('./models/users');
const Message = require('./models/message');

const userRoutes = require('./routes/user');
const msgRoutes = require('./routes/message');

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
}));

app.use(express.json());

app.use('/user',userRoutes);
app.use('/message',msgRoutes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync({force: true})
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));