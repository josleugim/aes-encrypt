/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';
const express = require('express'),
    bodyParser = require('body-parser');

module.exports = (app) => {
    const allowCrossDomain = function(req, res, next) {
        const whiteList = ['http://localhost:4000'];
        let origin = req.headers.origin;
        if(whiteList.indexOf(origin) > -1){
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            res.status(200);
            next();
        }
        else {
            next();
        }
    };

    app.use(allowCrossDomain);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));
};