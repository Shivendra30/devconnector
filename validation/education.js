//All the validation for our register
const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
	let errors = {};

	//IF the user doesn't enter anything, we need to make sure that we 
	//evaluate an empty string since validator methods take string inputs
	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.from = !isEmpty(data.from) ? data.from : '';
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

	if(Validator.isEmpty(data.school)){
		errors.school = "School field is required";
	}
	
	if(Validator.isEmpty(data.degree)){
		errors.degree = "Degree field is required";
	}
	if(Validator.isEmpty(data.from)){
		errors.from = "From date field is required";
	}
	
	if(Validator.isEmpty(data.fieldofstudy)){
		errors.fieldofstudy = "Field of study field is required";
	}
	
	return({errors: errors, isValid: isEmpty(errors)})
}