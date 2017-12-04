/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';
const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    completeName: {
        type: String,
        required: 'Complete name required'
    },
    email: {type: String},
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Contact', ContactSchema);