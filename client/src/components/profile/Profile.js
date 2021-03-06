import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';

import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';

class Profile extends Component {
	componentDidMount = () => {
		if (this.props.match.params.handle) {
			//getting the handle of the profile from the URL
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push('/not-found');
		}
	};

	render() {
		const { profile, loading } = this.props.profile;

		let profileContent;

		if (profile === null || loading === true) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div className="profile">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="row">
									<div className="col-6">
										<Link
											to="/profiles"
											className="btn btn-light mb-3 float-left"
										>
											Back To Profiles
										</Link>
									</div>
									<div className="col-6" />
								</div>
								<ProfileHeader profile={profile} />
								<ProfileAbout profile={profile} />
								<ProfileCreds profile={profile} />
								{profile.githubusername && (
									<ProfileGithub
										githubusername={profile.githubusername}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>{' '}
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
