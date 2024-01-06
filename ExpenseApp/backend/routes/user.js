const express = require('express');

const userController = require('../controllers/user');
const expenseController = require('../controllers/expense');


const router = express.Router();

router.post('/signup',userController.signup);

router.post('/getPassword',userController.getPass);

module.exports = router;