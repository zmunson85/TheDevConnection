const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const User = require('../../models/User');

/* @route POST api/users */
/* @desc Register a new user */
/* @access Public Route using middleware */

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email address!').isEmail(),
    check('password', 'Please enter a password with a minimum of 6 characters').isLength({ min: 6 })
],
    async (req, res) => {
        //set errors & check for errors on user input, and return the bad request response with errors in json. Print Error messages with array method

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check if user exists
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User Already Exists." }] })
            }
            //get users gravatar based on their email, optional for each user
            const avatar = normalize(gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }));

            user = new User({
                name, email, avatar, password
            });

            //encrypt the password using bcrypt
            const salt = await bcrypt.genSalt(10);

            //hash user password using salt/bcrypt
            user.password = await bcrypt.hash(password, salt);

            //return/save user to DB
            await user.save();

            //Return jsonWebtoken
            res.send('New User Registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }






    });


//export the route

module.exports = router;