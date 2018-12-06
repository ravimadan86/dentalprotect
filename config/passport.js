const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');

require('../models/Users');
const User = mongoose.model('users');

module.exports = function () {
    passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        User.findOne(
            {
                username: username
            }).then(user => {
                // Checking if there is any user
                if (!user) {
                    return done(null, false, { message: 'No user found' });
                }
                // Checking password match
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                });
            });
    }));
    
    //Establing sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}