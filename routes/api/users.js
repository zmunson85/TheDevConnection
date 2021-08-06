const express = require('express');
const router = express.Router();

/* @route get api/users */
/* @desc Test Route */
/* @access Public Route using middleware */

router.get('/', (req, res) => res.send('User Route'));


//export the route

module.exports = router;