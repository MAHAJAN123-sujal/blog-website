const express = require('express');
const { getAllUsers, registerController,loginController } = require('../controllers/userController');

const router = express.Router();

// getting all users => GET
router.get('/all-users',getAllUsers);

// creating users => POST
router.post('/register',registerController);

// for login page => POST
router.post('/login',loginController);
module.exports = router;