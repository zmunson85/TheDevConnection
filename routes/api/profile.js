const express = require('express');
const router = express.Router();

/* @route get api/profile */
/* @desc Test Route */
/* @access Public Route using middleware */

router.get('/', (req, res) => res.send('Profile Route'));


//export the route

module.exports = router;