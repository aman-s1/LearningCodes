const Expense = require('../models/expenses');
const sequelize = require('sequelize');
function isstringInvalid(string){
    if(string == undefined || string.length === 0)
    {
        return true;
    }
    else{
        return false;
    }
}

const addexpense = async (req, res) => {
    const { expenseamount, description, category } = req.body;
    if(expenseamount == undefined || expenseamount == 0)
    {
        return res.status(400).json({ err: 'Expense Amount is Missing' });
    }
    try {
        
        if (isstringInvalid(description) || isstringInvalid(category)) {
            return res.status(400).json({ err: 'Empty Parameters' });
        }
        const expense = await Expense.create({ expenseamount, description, category ,userId: req.user.id});
        return res.status(201).json({ expense });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to add expense' });
    }
};

const getexpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({ where: { userId: req.user.id}});
        return res.status(200).json({ expenses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteexpense = async (req, res) => {
    try {
        const expenseid = req.params.expenseid;

        if (expenseid == undefined || expenseid.length === 0) {
            return res.status(400).json({ err: 'Parameters Missing' });
        }

        await Expense.destroy({ where: { id: expenseid , userId: req.user.id} });
        return res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed' });
    }
};

const getExpenseSum = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have the user information attached to the request by middleware

        // Query the database to get the total sum of expenses for the user
        const result = await Expense.sum('expenseamount', { where: { userId}});

        res.status(200).json({ sum: result || 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getExpensesByCategory = async (req, res) => {
    try {
        const userId = req.user.id;

        const expensesByCategory = await Expense.findAll({
            attributes: ['category', [sequelize.fn('sum', sequelize.col('expenseamount')), 'sum']],
            where: { userId },
            group: ['category'],
        });

        res.status(200).json({ expenses: expensesByCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addexpense,
    getexpenses,
    deleteexpense,
    getExpenseSum,
    getExpensesByCategory,
};