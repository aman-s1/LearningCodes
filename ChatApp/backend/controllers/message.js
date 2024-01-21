const Message = require('../models/message');
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

const sendmessage = async (req,res) => {
    const { message } = req.body;
    try {
        if(isstringInvalid(message))
        {
            return res.status(400).json({ err: 'No message to send'});
        }
        const createdMsg = await Message.create({ message , userId: req.user.id });

        res.status(201).json({ message: createdMsg });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Failed to send Message'});
    }
}

const getMessages = async (req,res) => {
    try {
        const messages = await Message.findAll({
            include: {
                model: User,
                attributes: ['name'],
            },
        });
        
        return res.status(200).json({ messages });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Failed to get Expenses'});
    }
}

module.exports = {
    sendmessage,
    getMessages
}