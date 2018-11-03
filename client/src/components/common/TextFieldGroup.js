import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class TextFieldGroup extends Component {
	render() {
		const {
			name,
			placeholder,
			value,
			label,
			error,
			info,
			type,
			onChange,
			disabled
		} = this.props;
		return (
			<div className="form-group">
				<input
					type={type}
					value={value}
					onChange={onChange}
					className={classnames('form-control form-control-lg', {
						'is-invalid': error
					})}
					placeholder={placeholder}
					name={name}
					disabled={disabled}
				/>
				{info && (
					<small className="small-text text-muted">{info}</small>
				)}
				{error && <div className="invalid-feedback">{error} </div>}
			</div>
		);
	}
}

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	disabled: PropTypes.string
};

TextFieldGroup.deafultProps = {
	type: 'text'
};

export default TextFieldGroup;
