'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./server/core/controllers/errors.controller')),
    tokenManager = require('../token.controller'),
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
                code: err.code,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            login(user.username, user.password, function (err, obj) {
                if (err) {
                    return res.status(400).send(err);
                } else {
                    res.json(obj);
                }
            });
        }
    });
};

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
    login(req.body.username, req.body.password, function (err, obj) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.json(obj);
        }
    });
};

function login (username, password, callback) {
    var username = username || '';
    var password = password || '';

    if (username == '' || password == '') {
        callback({
            message: '用户名或密码不能为空'
        });
    }
    User.findOne({username: username}, function (err, user) {
        if (err) {
            callback(err);
        } else {
            if (!user) {
                callback({
                    message: '不存在该用户'
                });
            } else {
                user.authenticate(password, function(isMatch) {
                    if (!isMatch) {
                        callback({
                            message: '密码错误'
                        });
                    } else {
                        var token = tokenManager.sign({
                            iss: user.username
                        });
                        callback(null, {
                            token: token,
                            username: user.username,
                            photo: user.profileImageURL
                        });
                    }
                });
            }
        }
    });
}
