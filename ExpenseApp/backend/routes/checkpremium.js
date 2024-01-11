// routes/checkstatus.js

const express = require('express');
const authenticate = require('../middleware/auth');
const checkStatus = require('../controllers/checkstatus');

const router = express.Router();

router.get('/:userId', authenticate.authenticate, async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const result = await checkStatus.checkPremiumStatus(userId);

        if (result.status === 200) {
            console.log('ispremium');
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
