const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../models/Staff');
require('../models/Posts');

//Loading the model
const Employers = mongoose.model('employers');
const Posts = mongoose.model('posts');

/* GET home page. */
router.get('/', async (req, res, ) => {
  try {
    const employers = await Employers.find().limit(4);
    const posts = await Posts.find().limit(4).sort({ date: 'desc' });
    res.render('index', {
      employers: employers,
      posts: posts
    });
  } catch (err) {
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/');
  }
});

router.get('/about', (req, res) => {
  res.render('about',{
    pageTitle: 'About Us'
  });
});

router.get('/services', (req, res) => {
  res.render('services',{
    pageTitle: 'Services'
  });
});

router.get('/contact', (req, res) => {
  res.render('contact',{
    pageTitle: 'Contact'
  });
});

module.exports = router;