import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	constructor() {
		super();
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			current: '',
			description: '',
			disabled: '',
			errors: ''
		};
	}

	onSubmit = e => {
		e.preventDefault();

		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addEducation(eduData, this.props.history);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">
								Add Your Education
							</h1>
							<p className="lead text-center">
								Add any school, bootcamp, etc that you have
								attended
							</p>
							<small className="d-block pb-3">
								* = required field
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="text"
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}
									placeholder="* School Or Bootcamp"
									name="school"
								/>
								<TextFieldGroup
									type="text"
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}
									placeholder="* Degree Or Certificate"
									name="degree"
								/>
								<TextFieldGroup
									type="text"
									value={this.state.fieldofstudy}
									onChange={this.onChange}
									error={errors.fieldofstudy}
									placeholder="Field of Study"
									name="fieldofstudy"
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
									type="date"
									name="from"
								/>

								<h6>To Date</h6>
								<TextFieldGroup
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									type="date"
									name="to"
									disabled={this.state.disabled}
								/>

								<div className="form-check mb-4">
									<input
										className="form-check-input"
										type="checkbox"
										name="current"
										value={this.state.current}
										check={this.state.current.toString()}
										id="current"
										onClick={() =>
											this.setState({
												current: !this.state.current,
												disabled: !this.state.disabled
											})
										}
									/>
									<label
										className="form-check-label"
										htmlFor="current"
									>
										Current Job
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Program Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us about your experience and what you learned"
								/>
								<input
									type="submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
