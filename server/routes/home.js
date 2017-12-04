/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';
const path = require('path');

module.exports = (app, config) => {
    app.get('*', (req, res) => {
        res.sendFile(config.rootPath + 'public/index.html');
    });
};