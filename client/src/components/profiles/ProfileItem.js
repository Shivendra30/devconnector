import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
	render() {
		console.log('Profiles in Profile Item', this.props.profiles);
		const profiles = this.props.profiles;

		const profileItems = profiles.map(profile => {
			const skills = profile.skills.slice(0, 4);
			const skillItems = skills.map(skill => {
				return (
					<li key={skill} className="list-group-item">
						<i className="fa fa-check pr-1" />
						{skill}
					</li>
				);
			});

			return (
				<div
					key={profile.user._id}
					className="card card-body bg-light mb-3"
				>
					<div className="row">
						<div className="col-2">
							<img
								className="rounded-circle"
								src={profile.user.avatar}
								alt={profile.user.name}
							/>
						</div>
						<div className="col-lg-6 col-md-4 col-8">
							<h3>{profile.user.name}</h3>
							<p>
								{profile.status}{' '}
								{isEmpty(profile.company)
									? ''
									: `at ${profile.company}`}
							</p>
							<p>
								{isEmpty(profile.location)
									? ''
									: profile.location}
							</p>
							<Link
								to={`/profile/${profile.handle}`}
								className="btn btn-info"
							>
								View Profile
							</Link>
						</div>
						<div className="col-md-4 d-none d-lg-block">
							<h4>Skill Set</h4>
							<ul className="list-group">{skillItems}</ul>
						</div>
					</div>
				</div>
			);
		});

		return <div> {profileItems} </div>;
	}
}

ProfileItem.propTypes = {
	profiles: PropTypes.array.isRequired
};

export default ProfileItem;
