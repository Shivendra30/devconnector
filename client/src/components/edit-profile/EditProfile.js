import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
	constructor() {
		super();
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			instagram: '',
			youtube: '',
			errors: {}
		};
	}

	componentDidMount = () => {
		this.props.getCurrentProfile();
	};

	componentWillReceiveProps = nextProps => {
		//Fetch the errors from the redux store and put into component state
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			//bring skills array back to csv
			profile.skills = profile.skills.join(',');

			//If profile field does not exist, make it an empty string
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location)
				? profile.location
				: '';
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.social.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			profile.social.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';
			profile.social.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: '';
			profile.social.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';
			profile.social.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';

			console.log('PROFILE', profile);
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: profile.skills,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.social.twitter,
				facebook: profile.social.facebook,
				linkedin: profile.social.linkedin,
				instagram: profile.social.instagram,
				youtube: profile.social.youtube
			});
		}
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			instagram: this.state.instagram,
			youtube: this.state.youtube
		};

		this.props.createProfile(profileData, this.props.history);
	};

	toggleButton = e => {
		this.setState({
			displaySocialInputs: !this.state.displaySocialInputs
		});
	};

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						icon="fab fa-twitter"
						type="text"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
						placeholder="Twitter Profile URL"
						name="twitter"
					/>

					<InputGroup
						icon="fab fa-facebook"
						type="text"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
						placeholder="Facebook Page URL"
						name="facebook"
					/>
					<InputGroup
						icon="fab fa-linkedin"
						type="text"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
						placeholder="Linkedin Profile URL"
						name="linkedin"
					/>

					<InputGroup
						icon="fab fa-youtube"
						type="text"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
						placeholder="Youtube Channel URL"
						name="youtube"
					/>

					<InputGroup
						icon="fab fa-instagram"
						type="text"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
						placeholder="Instagram Page URL"
						name="instagram"
					/>
				</div>
			);
		} else {
			socialInputs = <div> </div>;
		}

		//Select options for status
		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">
								Edit Your Profile
							</h1>
							<p className="lead text-center">
								Let's get some information to make your profile
								stand out
							</p>
							<small className="d-block pb-3">
								* = required field
							</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="text"
									placeholder="* Profile handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL.
										Your full name, company name, nickname,
										etc (This CAN'T be changed later)"
								/>
								<SelectListGroup
									name="status"
									value={this.state.status}
									error={errors.status}
									info="Give us an idea of where you are at in
										your career"
									onChange={this.onChange}
									options={options}
								/>
								<TextFieldGroup
									type="text"
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you
										work for"
								/>
								<TextFieldGroup
									type="text"
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own or a company website"
								/>
								<TextFieldGroup
									type="text"
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City & state suggested (eg. Boston, MA)"
								/>
								<TextFieldGroup
									type="text"
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg.
										HTML,CSS,JavaScript,PHP)"
								/>
								<TextFieldGroup
									type="text"
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want your latest repos and a
										Github link, include your username"
								/>
								<TextAreaFieldGroup
									type="text"
									placeholder="A short bio of yourself"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button
										type="button"
										className="btn btn-light"
										onClick={this.toggleButton}
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>

								{socialInputs}

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

EditProfile.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(EditProfile));
