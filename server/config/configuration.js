/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';
const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: process.env.DB_HOST || 'mongodb://localhost/aes-crypto',
        rootPath: rootPath,
        port: process.env.PORT || 4000,
        tokenSecret: process.env.TOKEN_SECRET || 't54valora6p'
    }
};