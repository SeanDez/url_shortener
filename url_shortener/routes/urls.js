const express = require("express");
const router = express.Router();


router.get('/', (request, response) => {
// in this case / represents /urls

    // console.log('urls.js: 9', long_url);
    response.redirect('../result');
    // then the lower level route handler, index.js, handles the request to /result

    // response.send(long_url);
});


module.exports = router;
module.exports.long_url = '';
