'use strict';

module.exports = {
    app: {
        title: 'Demo',
        description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
        keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
    },
    port: process.env.PORT || 8081,
    templateEngine: 'swig',
    webDir: 'www',
    jwtTokenSecret: process.env.TOKEN_SECRET || 'DEMO'
};
