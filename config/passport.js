//Strategy

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('./keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		console.log(jwt_payload);
		User.findById(jwt_payload.id)
		.then(user => {
			if(user) {
				return done(null, user); //First parameter is an error if any, the seond paramater is the value to be returned
			}
			return done(null, false);
		}).catch(err => console.log(err));
	}));
}