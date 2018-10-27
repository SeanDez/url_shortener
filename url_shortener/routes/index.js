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


const lookup_shortlink = (long_link) => {
    // construct a findOne query
    let query = ShortLink.findOne({
        'long_link' : long_link
    });

    query.select('long_link short_link');
    query.exec((error, record) => {
        if (error) {
            console.log(error)
        } else {
            console.log("record", record);
        }
    })
};


// pass current record or create new and pass back
const return_record_or_create_new = (record, long_link) => {
    if (record) {
        // record is found >> return it to the front end
        console.log("found record ", record);
        return record
    } else if (record !== null || record !== undefined) {
        // create a new record
        const new_shortlink_record = new ShortLink({
            long_link : long_link,
            short_link : process.env.ROOT_DOMAIN + '/r/' + shortid.generate()
        });
        new_shortlink_record.save((error, saved_record) => {
            if (error) {
                console.log(error);
            } else if (saved_record) {
                console.log("saved record ", saved_record);
            }
        })

    }
};


// API Endpoints


router.get('/result', function (req, res, next) {
    const long_url = req.query.long_url;

    return_record_or_create_new(lookup_shortlink(), long_url);

    // render the data to the result page
    res.render('result', { title: "Results", short_url : long_url });

});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});





module.exports = router;
