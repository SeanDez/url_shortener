const express = require("express");
const router = express.Router();


router.get('/', (request, response) => {
    long_url = request.query.long_url;
    console.log(long_url);
    response.send(long_url);
});


module.exports = router;