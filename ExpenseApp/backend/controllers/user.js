const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/users');


function isstringInvalid(string){
    if(string == undefined || string.length === 0)
    {
        return true;
    }
    else{
        return false;
    }
}
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (isstringInvalid(name) || isstringInvalid(email) || isstringInvalid(password)) {
        return res.status(400).json({ err: 'Empty Parameters' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ err: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Successfully Created new User' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ err: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ err: 'User does not exist' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ err: 'User not authorized' });
        }

        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getPass = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user with the specified email exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ err: 'User not found with this email address' });
        }

        res.status(200).json({ password: user.password });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    signup,
    login,
    getPass
};