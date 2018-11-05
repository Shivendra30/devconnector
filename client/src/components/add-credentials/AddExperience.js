import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
	constructor() {
		super();
		this.state = {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: '',
			description: '',
			errors: '',
			disabled: ''
		};
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		//Submit exp
		const expData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addExperience(expData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="section add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">
								Add Your Experience
							</h1>
							<p className="lead text-center">
								Add any developer/programming positions that you
								have had in the past or current
							</p>
							<small className="d-block pb-3">
								* = required field
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="text"
									value={this.state.title}
									error={errors.title}
									onChange={this.onChange}
									placeholder="* Job Title"
									name="title"
								/>
								<TextFieldGroup
									type="text"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									placeholder="* Company"
									name="company"
								/>
								<TextFieldGroup
									type="text"
									value={this.state.location}
									onChange={this.onChange}
									placeholder="Location"
									name="location"
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									type="date"
									value={this.state.from}
									error={errors.from}
									onChange={this.onChange}
									name="from"
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									type="date"
									value={this.state.to}
									onChange={this.onChange}
									name="to"
									disabled={
										this.state.disabled ? 'disabled' : ''
									}
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
												disabled: !this.state.disabled,
												current: !this.state.current
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
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									info="Some of your responsibilities"
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

AddExperience.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ addExperience }
)(withRouter(AddExperience));
