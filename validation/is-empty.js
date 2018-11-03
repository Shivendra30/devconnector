//A file for defining a function which will tell if any object is null, undefined or empty

const isEmpty = value => {
	return (
		value === null ||
		value === undefined ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
};

module.exports = isEmpty;
