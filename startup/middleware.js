const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const paginateHelper = require('express-handlebars-paginate');
const express = require('express');
const path = require('path');

const {
    truncate,
    formatDate
} = require('../helper/hbs');

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(require('cookie-parser')());

    // method-override middleware
    app.use(methodOverride('_method'));

    // Express session midleware
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }));

    // Connect-flash midleware
    app.use(flash());

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // express-handlebars middleware
    app.engine('handlebars', exphbs({
        helpers: {
            truncate: truncate,
            formatDate: formatDate,
            paginateHelper: paginateHelper.createPagination
        },
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

    // Global variables
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    // Using public folder
    app.use(express.static(path.join(__dirname, '../public')));
}