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


const lookup_shortlink = (long_link, not_found_callback) => {
    console.log("long_link from parameter, before hitting the findOne ", long_link);

    ShortLink.findOne({
            long_link : long_link
        },
        function (error, document) {
            if (error) {
                console.log('error ', error)
            } else if (document.long_link) {
                console.log("document found during lookup", document);
                console.log("document short_link", object.short_link);
                return document.short_link;
            } else {
                console.log("document not found during lookup");
                create_new_shortlink_record(long_link)
            }
        }
    )
};

const create_new_shortlink_record = (long_link) => {
    const short_link_record = new ShortLink({
        long_link : long_link,
        short_link : shortid.generate()
    });
    short_link_record.save((error, document) => {
        if (error) {
            console.log(error);
        } else {
            console.log('index.js:56', document.short_link);
            // pass the short_url to index.pug
            // render the data to the result page


            res.render('result', { title: "Results", short_url : shortid.generate() + '/r/' + document.short_link });
        }
    });


};



// API Endpoints


router.get('/result', function (req, res, next) {
    const long_url = req.query.long_url;

    // check if the long url is in the db already
    // if yes then set short_url to the collection.short_url
    // if no then generate new record
    lookup_shortlink(long_url, create_new_shortlink_record)

});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});





module.exports = router;
