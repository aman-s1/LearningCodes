const jwt = require('jsonwebtoken');
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

        await User.create({ name, email, password });
        res.status(201).json({ message: 'Successfully Created new User' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Validate Input
        if (!email || !password) {
            return res.status(400).json({ err: 'Email and password are required' });
        }

        // Step 2: Check User Existence
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ err: 'Invalid email or password' });
        }

        // Step 3: Password Verification (Without bcrypt)
        if (password !== user.password) {
            return res.status(401).json({ err: 'Invalid email or password' });
        }

        // Step 4: Generate and Send Token
        const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Login successful' });
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