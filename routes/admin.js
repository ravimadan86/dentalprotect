const express = require('express');
const router = express.Router();
const { authentication } = require('../helper/auth');
const adminController = require('../controllers/adminController');

// Rendering Login page
router.get('/login', adminController.renderLoginPage);

// Rendering change password page
router.get('/changepassword', authentication, adminController.renderChangePasswordPage );

// Changing password
router.post('/changepassword', authentication, adminController.changePassword);

// Proccesing login form
router.post('/login', adminController.login);


router.get('/logout', adminController.logout);


module.exports = router;