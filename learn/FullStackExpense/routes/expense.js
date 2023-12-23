const path = require('path');

const express = require('express');

const ExpenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/',ExpenseController.getAllExpenses);

router.post('/add-expense',ExpenseController.addExpense);

router.get('/edit-expense/:id',ExpenseController.getEditExpense);

router.post('/update-expense/:id',ExpenseController.updateExpense);

router.get('/delete-expense/:id',ExpenseController.deleteExpense);

module.exports = router;