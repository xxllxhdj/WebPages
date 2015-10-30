'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./server/core/controllers/errors.controller')),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function (req, res) {
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    // Init Variables
    var user = new User(req.body);

    // Add missing user fields
    user.username = user.email;

    // Then save the user
    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // Remove sensitive data before login
            //user.password = undefined;
            //user.salt = undefined;
            //
            //req.login(user, function (err) {
            //    if (err) {
            //        res.status(400).send(err);
            //    } else {
            //        res.json(user);
            //    }
            //});
            res.json(user);
        }
    });
};

/**
 * Signin after passport authentication
 */
//exports.signin = function (req, res, next) {
//    passport.authenticate('local', function (err, user, info) {
//        if (err || !user) {
//            res.status(400).send(info);
//        } else {
//            // Remove sensitive data before login
//            user.password = undefined;
//            user.salt = undefined;
//
//            req.login(user, function (err) {
//                if (err) {
//                    res.status(400).send(err);
//                } else {
//                    res.json(user);
//                }
//            });
//        }
//    })(req, res, next);
//};

/**
 * Signout
 */
//exports.signout = function (req, res) {
//    req.logout();
//    res.redirect('/');
//};
