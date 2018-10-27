var express = require('express');
var router = express.Router();
require('dotenv').load();
const ShortLink = require('../models/shortlinks');
const shortid = require("shortid");
require("dotenv").load();

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('open', () => {
    console.log("Connected to MongoDB");
});



// Functions


const lookup_shortlink_or_create_new = (long_link) => {
    // ShortLink.
    const new_shortlink = new ShortLink();
    new_shortlink.long_link = long_link;
    // new_shortlink.short_link = 'S link';

    short_link.save((error) => {
        if (error) {
            console.log(error);
        } else {

            //chose a 4 digit random number
            const new_shortid = shortid.generate();

            //ensure it is not already assigned
            const shortid_match_result = short_link.findOne({ short_link : new_shortid });
            console.log('index.js:44: ', shortid_match_result);

            //assign it / create new record
            if (shortid_match_result === false) {
                short_link.save({
                    long_link : long_link,
                    short_link : process.env.ROOT_DOMAIN + '/r/' + new_shortid
                });
                console.log('successfully saved new shortlink');
            }
        }
    })
};

// const



// API Endpoints


router.get('/result', function (req, res, next) {
    const long_url = req.query.long_url;

    lookup_shortlink_or_create_new(long_url);
    route_to_homepage(new_shortlink);

    res.render('result', { title: "Results", short_url : long_url })
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});





module.exports = router;
