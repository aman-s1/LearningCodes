const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/',(req,res,next) => {
    console.log('Contact route reached');
    res.sendFile(path.join(__dirname,'../','Views','contactus.html'));
});

router.post('/',(req,res,next) => {
    console.log('Form Submitted');
    res.redirect('/contact/success');
});

module.exports = router;