const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/',(req,res,next) => {
    console.log('Success route reached');
    res.sendFile(path.join(__dirname,'../','Views','success.html'));
});

module.exports = router;