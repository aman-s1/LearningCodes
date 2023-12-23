const Expense = require('../models/expense');

exports.getAllExpenses = async (req,res) => {
    const expenses = await Expense.findAll();
    res.render('index', { expenses });
};

exports.addExpense = async (req,res) => {
    const { amount, description, type } = req.body;
    
    try {
        console.log('Received data:', { amount, description, type });
        const expense = await Expense.create({ amount, description, type });
        console.log('Expense added:', expense);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Error in adding Expense' });
    }
};

exports.getEditExpense = async (req,res) => {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    res.render('edit', { expense });
};

exports.updateExpense = async (req,res) => {
    const expenseId = req.params.id;
    const { amount, description, type} = req.body;

    try{
        await Expense.update({ amount, description, type }, { where: { id: expenseId} });
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Error in updating expense'});
    }
};

exports.deleteExpense = async (req,res) => {
    const expenseId = req.params.id;

    try{
        await Expense.destroy({ where: { id: expenseId } });
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Error in deleting expense'});
    }
};