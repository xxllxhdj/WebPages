'use strict';

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
    //console.log('/api:' + req.query.method);
    //console.log('/api:' + JSON.stringify(req.query));
    res.send('Hello World');
};