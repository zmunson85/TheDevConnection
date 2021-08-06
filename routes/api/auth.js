const express = require('express');
const router = express.Router();
//use middleware
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
/* @route get api/auth */
/* @desc Test Route */
/* @access Public Route using middleware */

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/* @route POST api/auth */
/* @desc Authenticate User and get the Token */
/* @access Public Route using middleware */

router.post('/', [
    check('email', 'Please include a valid email address!').isEmail(),
    check('password', 'Password is required!').exists()
],
    async (req, res) => {
        //set errors & check for errors on user input, and return the bad request response with errors in json. Print Error messages with array method

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check if user exists
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] });
            }



            //jwt.io for documentation
            const payload = {
                user: {
                    id: user.id
                }
            }

            //CALL BACK error or TOKEN
            jwt.sign(payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


//export the route


//export the route

module.exports = router;