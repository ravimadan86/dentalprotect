const express = require('express');
const router = express.Router();
const { authentication } = require('../helper/auth');
const catgController = require('../controllers/catgController');

// Render add new category page
router.get('/addcategory', authentication, catgController.renderAddCatgPage);

// Render edit category page
router.get('/editcategory/:id', authentication, catgController.renderEditCatgPage);

// Add new category
router.post('/addcategory', authentication, catgController.newCategory);

//Edit category
router.put('/editcategory/:id', authentication, catgController.editCategory);

//Delete category
router.delete('/delete/:id',authentication, catgController.deleteCategory);

module.exports = router;