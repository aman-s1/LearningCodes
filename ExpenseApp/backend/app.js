const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');

const app = express();
const dotenv = require('dotenv');

const helmet = require('helmet');

app.use(helmet());

dotenv.config();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}
));
app.use(express.json());
app.use('/user',userRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));