const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//Load Inout Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load user model
const User = require('../../models/User');

// @route 	GET api/users/test
// @desc 	Tests users route
// @acess 	Public
router.get('/test', (req, res) => {
	res.json({ msg: 'Users Works' });
});

// @route 	GET api/users/register
// @desc 	Register Users
// @acess 	Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	//Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	//Find if the email actually exists
	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', //Size
				r: 'pg', //Rating
				d: 'mm' //Default
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar: avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route 	POST api/users/login
// @desc 	Login Users
// @acess 	Public
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	//Find User by email
	User.findOne({ email: email }).then(user => {
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		//Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				//the user is valid, generate the token
				//payload is the info that you want to send to the JWT
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};

				//Sign the Token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({ sucess: true, token: 'Bearer ' + token });
					}
				);
			} else {
				errors.password = 'Password incorect';
				return res.status(400).json(errors);
			}
		});
	});
});

// @route 	GET api/users/current
// @desc 	Return current user
// @acess 	Private

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		//Since the passport validated the token, the user details from the token payload come into the req object
		//Which means we can access the user from the req object
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

module.exports = router;
