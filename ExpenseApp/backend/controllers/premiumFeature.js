const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

const getuserLeaderBoard = async (req,res) => {
    try{
        const leaderboardUsers = await User.findAll({
            attributes: [ 'id' , 'name' , [sequelize.fn('sum' , sequelize.col('expenses.expenseamount')), 'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['user.id'],
            order: [['total_cost', 'DESC']]
        });
        console.log(leaderboardUsers);
        res.status(200).json(leaderboardUsers);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getuserLeaderBoard
};