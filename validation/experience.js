//All the validation for our register
const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
	let errors = {};

	//IF the user doesn't enter anything, we need to make sure that we 
	//evaluate an empty string since validator methods take string inputs
	data.title = !isEmpty(data.title) ? data.title : '';
	data.company = !isEmpty(data.company) ? data.company : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if(Validator.isEmpty(data.title)){
		errors.title = "Title field is required";
	}
	
	if(Validator.isEmpty(data.company)){
		errors.company = "Company field is required";
	}
	if(Validator.isEmpty(data.from)){
		errors.from = "From date field is required";
	}
	
	return({errors: errors, isValid: isEmpty(errors)})
}