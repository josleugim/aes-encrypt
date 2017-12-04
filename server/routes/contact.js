/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';
const ContactCtrl = require('../controllers/ContactCtrl');
module.exports = (app) => {
    app.post('/api/contact', ContactCtrl.post);
    app.get('/api/contact', ContactCtrl.get);
};