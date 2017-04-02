const express = require('express');
const router = express.Router();

//Register
router.get('/register', (req, res, next) => {
    res.send();
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send();
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send();
});

//Validate
router.get('/validate', (req, res, next) => {
    res.send();
});

module.exports = router;