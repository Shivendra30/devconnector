import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class SelectListGroup extends Component {
	render() {
		const { name, value, error, info, onChange, options } = this.props;
		const selectOptions = options.map(option => (
			<option key={option.label} value={option.value}>
				{' '}
				{option.label}{' '}
			</option>
		));
		return (
			<div className="form-group">
				<select
					className={classnames('form-control form-control-lg', {
						'is-invalid': error
					})}
					name={name}
					onChange={onChange}
					value={value}
				>
					{selectOptions}
				</select>
				{info && (
					<small className="small-text text-muted">{info}</small>
				)}
				{error && <div className="invalid-feedback">{error} </div>}
			</div>
		);
	}
}

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
};

export default SelectListGroup;
