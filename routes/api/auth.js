const express = require('express');
const router = express.Router();

/* @route get api/auth */
/* @desc Test Route */
/* @access Public Route using middleware */

router.get('/', (req, res) => res.send('Auth Route'));


//export the route

module.exports = router;