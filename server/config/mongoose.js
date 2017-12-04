/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';
const mongoose = require('mongoose'),
    ContactModel = require('../models/Contact');

module.exports = (config) => {
    mongoose.connect(config.db);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Upgrade DB opened...');
    });
};