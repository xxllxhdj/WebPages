'use strict';

module.exports = function (app) {
  // Root routing
  var api = require('../controllers/api.controller');

  // Define application route
  app.route('/api').get(api.renderIndex);
};
