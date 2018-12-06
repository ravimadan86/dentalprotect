const bcrypt = require('bcryptjs');
const passport = require('passport');

const { findUser } = require('../models/Users');

module.exports = {
    renderLoginPage: (req, res) => {
        if (!req.user) {
            res.render('admin/login');
        } else {
            req.flash('error_msg', 'You are logged in');
            res.redirect('/');
        }
    },
    renderChangePasswordPage: (req, res) => {
        res.render('admin/change-password');
    },
    changePassword: async (req, res) => {
        try {
            let errors = [];
            // Register form validation
            if (req.body.newpassword !== req.body.password2) {
                errors.push({
                    text: 'Passwords do not match!'
                });
            }
            if (req.body.newpassword.length < 6 || req.body.newpassword.length > 1024) {
                errors.push({
                    text: 'Password must be at least 6 characters!'
                });
            }
            if (errors.length > 0) {
                res.render('admin/change-password', {
                    errors: errors,
                });
            } else {
                //Checking if user exists.
                let user = await findUser(req.user.id);
                if (!user) {
                    req.flash('error_msg', 'No user');
                    res.redirect('/admin/changepassword');
                } else {
                    // saving new password in DB after using bcrypt
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.newpassword, salt, async (err, hash) => {
                            try {
                                //Handle error
                                if (err) throw err;
                                // Store hash in your password DB.
                                user.password = hash;
                                await user.save();
                                req.flash('success_msg', 'Your password was changed.Please login with your new password!')
                                req.logout();
                                res.redirect('/admin/login');
                            } catch (err) {
                                req.flash('error_msg', 'Something went wrong');
                                res.redirect('/admin/changepassword');
                            }
                        }); //ending hash function
                    }); // Ending generating salt.
                }
            }
        } catch (err) {
            req.flash('error_msg', 'Something went wrong');
            res.redirect('/admin/changepassword');
        }
    },
    login: (req, res, next) => {
        passport.authenticate('local', {
            failureRedirect: '/admin/login',
            successRedirect: '/',
            failureFlash: true
        })(req, res, next);
    },
    logout: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out')
        res.redirect('/admin/login');
    }
}