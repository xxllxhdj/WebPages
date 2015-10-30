'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    config = require(path.resolve('./config/config')),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.sign = function (payload) {
    payload.exp = moment().add(7, 'days').valueOf();
    return jwt.encode(payload, config.jwtTokenSecret);
};

exports.auth = function (req, res, next) {
    var token = getToken(req.headers);
    if (!token) {
        res.send(401).send({
            message: '���ȵ�¼'
        });
    } else {
        var decoded = jwt.decode(token, config.jwtTokenSecret);
        if (decoded.exp <= Date.now()) {
            //res.end('�û�״̬�ѹ���', 400);
            res.send(400).send({
                message: '�û�״̬�ѹ���'
            });
        } else {
            User.findOne({username: decoded.iss}, function (err, user) {
                if (err) {
                    res.send(401).send(err);
                } else {
                    if (!user) {
                        res.send(400).send({
                            message: '�����ڸ��û�'
                        });
                    } else {
                        req.user = user;
                        return next();
                    }
                }
            });
        }
    }
};

function getToken (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length == 2) {
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}