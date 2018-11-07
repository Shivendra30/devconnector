import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

class ProfileCreds extends Component {
	render() {
		const { profile } = this.props;
		console.log('ProfileAbout', profile);

		const education = profile.education;
		const educationArray = education.map(edu => {
			return (
				<li className="list-group-item" key={edu._id}>
					<h4>{edu.school}</h4>
					<p>
						<Moment format="MM/YYYY">{edu.from}</Moment> -
						{edu.to ? (
							<Moment format="MM/YYYY">{edu.to}</Moment>
						) : (
							'Current'
						)}
					</p>
					<p>
						<strong>Degree: </strong>
						{edu.degree}
					</p>
					<p>
						<strong>Field Of Study: </strong>
						{edu.fieldofstudy}
					</p>
					<p>
						{edu.description && (
							<span>
								<strong>Description:</strong> {edu.description}
							</span>
						)}
					</p>
				</li>
			);
		});

		const experience = profile.experience;
		const experienceArray = experience.map(exp => {
			return (
				<li className="list-group-item" key={exp._id}>
					<h4>{exp.company}</h4>
					<p>
						<Moment format="MM/YYYY">{exp.from}</Moment> -
						{exp.to ? (
							<Moment format="MM/YYYY">{exp.to}</Moment>
						) : (
							'Current'
						)}
					</p>
					<p>
						<strong>Position:</strong> {exp.title}
					</p>
					<p>
						{exp.location && (
							<span>
								{' '}
								<strong> Location: </strong> {exp.location}
							</span>
						)}
					</p>
					<p>
						{exp.description && (
							<span>
								<strong>Description:</strong> {exp.description}
							</span>
						)}
					</p>
				</li>
			);
		});

		return (
			<div className="row">
				<div className="col-md-6">
					<h3 className="text-center text-info">Experience</h3>
					{experienceArray.length > 0 ? (
						<ul className="list-group">{experienceArray}</ul>
					) : (
						<p className="text-center"> No Experience Listed </p>
					)}
				</div>

				<div className="col-md-6">
					<h3 className="text-center text-info">Education</h3>
					{educationArray.length > 0 ? (
						<ul className="list-group">{educationArray}</ul>
					) : (
						<p className="text-center"> No Education Listed </p>
					)}
				</div>
			</div>
		);
	}
}

ProfileCreds.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileCreds;
