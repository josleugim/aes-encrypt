/**
 * Created by Mordekaiser on 04/12/17.
 */
'use strict';

const mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');
const CryptoJS = require("crypto-js");

exports.post = (req, res) => {
    // console.log('POST Contact');
    let data = {};

    if(req.body.completeName) {
        data.completeName = CryptoJS.AES.encrypt(req.body.completeName, process.env.AES_KEY);
    }

    if(req.body.email) {
        data.email = CryptoJS.AES.encrypt(req.body.email, process.env.AES_KEY);
    }

    //console.log(data);

    //const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.AES_KEY);
    //console.log(ciphertext.toString());


    /*const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), process.env.AES_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData);*/

    const contact = new Contact(data);
    contact.save(function (err, contact) {
        if (err) {
            console.error('ContactCtrl - POST. ' + err);
        }
        if (contact) {
            res.json({success: true});
        }
        else {
            res.json({success: false});
        }
    });
};

exports.get = (req, res) => {
    let contactPromise = query => {
        return new Promise((resolve, reject) => {
            Contact
                .find(query)
                .exec((err, contacts) => {
                    if(err) {
                        console.error(err);
                    }
                    if(contacts.length > 0) {
                        resolve(contacts);
                    } else {
                        reject('No data found');
                    }
                });
        })
    };

    let decryptPromise = contacts => {
        return new Promise((resolve, reject) => {
            let contactPromises = [];

            if (typeof contacts !== 'undefined') {
                contacts.forEach(contact => {
                    contactPromises.push(decryptData(contact));
                });

                Promise.all(contactPromises).then(contacts => {
                    resolve(contacts);
                })
            } else {
                reject({message: 'No courses received'});
            }
        })
    };

    function decryptData(contact) {
        return new Promise((resolve, reject) => {
            const completeNameBytes  = CryptoJS.AES.decrypt(contact.completeName.toString(), process.env.AES_KEY);
            const emailBytes  = CryptoJS.AES.decrypt(contact.email.toString(), process.env.AES_KEY);
            let decryptedData = {
                completeName: completeNameBytes.toString(CryptoJS.enc.Utf8),
                email: emailBytes.toString(CryptoJS.enc.Utf8),
                isActive: contact.isActive
            };

            resolve(decryptedData);
        })
    }

    function sendResponse(contacts) {
        let resData = {
            success: false,
            contacts: []
        };
        if(typeof contacts !== 'undefined') {
            resData.success = true;
            resData.contacts = contacts;
            res.status(200).json(resData);
        } else {
            res.status(404).json(resData);
        }
    }

    const query = {
        isActive: true
    };
    contactPromise(query)
        .then(decryptPromise)
        .then(sendResponse);
};