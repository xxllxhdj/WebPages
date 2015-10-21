'use strict';

module.exports = function (app) {
  // Root routing
  var admin = require('../controllers/admin.controller');

  // Define admin route
  app.route('/admin').post(admin.renderIndex);
};
