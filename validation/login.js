//All the validation for our register
const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
	let errors = {};
	//IF the user doesn't enter anything, we need to make sure that we 
	//evaluate an empty string since validator methods take string inputs
	
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if(!Validator.isEmail(data.email)){
		errors.email = "Email is invalid";
	}

	if(Validator.isEmpty(data.email)){
		errors.email = "Email field is required";
	}

	if(Validator.isEmpty(data.password)){
		errors.password = "Password field is required";
	}


	return({errors: errors, isValid: isEmpty(errors)})
}