import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class TextAreaFieldGroup extends Component {
	render() {
		const { name, placeholder, value, error, info, onChange } = this.props;
		return (
			<div className="form-group">
				<textarea
					value={value}
					onChange={onChange}
					className={classnames('form-control form-control-lg', {
						'is-invalid': error
					})}
					placeholder={placeholder}
					name={name}
				/>
				{info && (
					<small className="small-text text-muted">{info}</small>
				)}
				{error && <div className="invalid-feedback">{error} </div>}
			</div>
		);
	}
}

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
