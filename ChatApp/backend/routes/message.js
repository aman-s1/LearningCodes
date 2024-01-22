const express = require('express');

const messageController = require('../controllers/message');
const authenticateMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/sendmessage',authenticateMiddleware.authenticate,messageController.sendmessage);

router.get('/getmessage',authenticateMiddleware.authenticate,messageController.getMessages);

router.get('/getoldmessage',authenticateMiddleware.authenticate,messageController.getoldMessages);

module.exports = router;