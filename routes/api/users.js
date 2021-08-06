const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator')
/* @route POST api/users */
/* @desc Register a new user */
/* @access Public Route using middleware */

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email address!').isEmail(),
    check('password', 'Please enter a password with a minimum of 6 characters').isLength({ min: 6 })
],
    (req, res) => {
        //set errors & check for errors on user input, and return the bad request response with errors in json. Print Error messages with array method

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send('User Route')
    });


//export the route

module.exports = router;