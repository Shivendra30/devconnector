import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;

		const skillsArray = profile.skills.map(skill => {
			return (
				<div className="p-3" key={skill}>
					<i className="fa fa-check" /> {skill}
				</div>
			);
		});

		const firstName = profile.user.name.trim().split(' ')[0];

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						<h3 className="text-center text-info">{`${firstName}'s Bio`}</h3>
						<p className="lead">
							{isEmpty(profile.bio) ? (
								<span>
									{`${firstName} does not have a bio`}{' '}
								</span>
							) : (
								profile.bio
							)}
						</p>
						<hr />
						<h3 className="text-center text-info">Skill Set</h3>
						<div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{skillsArray}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
