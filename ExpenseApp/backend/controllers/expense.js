const Expense = require('../models/expenses');
const User = require('../models/users');
const sequelize = require('../util/database');

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
    const t = await sequelize.transaction();

    const { expenseamount, description, category } = req.body;

    try {
        // Validate expense amount
        if (expenseamount === undefined || expenseamount <= 0) {
            return res.status(400).json({ err: 'Expense Amount is Missing or Invalid' });
        }

        // Validate description and category
        if (isstringInvalid(description) || isstringInvalid(category)) {
            return res.status(400).json({ err: 'Empty Parameters for Description or Category' });
        }

        // Create an expense record
        const createdExpense = await Expense.create({
            expenseamount,
            description,
            category,
            userId: req.user.id,
        }, { transaction: t });

        // Update total expenses for the user
        const totalExpense = Number(req.user.totalExpenses) + Number(expenseamount);
        await User.update(
            {
                totalExpenses: totalExpense,
            },
            {
                where: { id: req.user.id },
                transaction: t,
            }
        );

        await t.commit(); 
        res.status(201).json({ expense: createdExpense });
    } catch (err) {
        console.error(err);
        await t.rollback(); 
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
    const t = await sequelize.transaction();

    try {
        const expenseid = req.params.expenseid;

        if (expenseid == undefined || expenseid.length === 0) {
            await t.rollback();
            return res.status(400).json({ err: 'Parameters Missing' });
        }

        const expense = await Expense.findByPk(expenseid);
        const user = await User.findByPk(req.user.id);

        if (!expense) {
            await t.rollback();
            return res.status(404).json({ message: 'Expense not found' });
        }

        const totalExpenses = user.totalExpenses - expense.expenseamount;

        await Expense.destroy({ where: { id: expenseid, userId: req.user.id }, transaction: t });

        await User.update(
            {
                totalExpenses: totalExpenses,
            },
            {
                where: { id: req.user.id },
                transaction: t,
            }
        );

        await t.commit();
        return res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.log(err);
        await t.rollback();
        return res.status(500).json({ message: 'Failed' });
    }
};



const getExpenseSum = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ sum: user.totalExpenses });
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