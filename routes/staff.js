const express = require('express');
const router = express.Router();
const { authentication } = require('../helper/auth');
const staffController = require('../controllers/staffController');

// Uploading multer
const { uploadSingle }= require('../config/multer');

// Render staff page
router.get('/', staffController.renderStaffPage);

// Render add staff page
router.get('/addstaff',authentication, staffController.renderAddStaffPage);

// Render update staff page
router.get('/updatestaff/:id',authentication, staffController.renderUpdateStaffPage);

// Adding employer
router.post('/addstaff',authentication, uploadSingle, staffController.addNewEmployer);

// Edit employer
router.put('/updatestaff/:id', authentication, uploadSingle, staffController.editEmployer);

// Delete employer
router.delete('/delete/:id',authentication, staffController.removeEmployer);

module.exports = router;