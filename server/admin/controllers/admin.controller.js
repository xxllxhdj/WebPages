'use strict';

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
    //console.log('/admin:' + req.query.method);
    //console.log('/admin:' + JSON.stringify(req.body));
    res.send('Hello World');
};