'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.controller');

  // Setting up the users profile api
  //app.route('/api/users').put(users.update);

  // Finish by binding the user middleware
  //app.param('userId', users.userByID);
};
