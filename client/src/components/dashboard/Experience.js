import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
	onDeleteClick = id => {
		this.props.deleteExperience(id);
	};

	render() {
		const experienceArray = this.props.exp;

		const expData = experienceArray.map(experience => {
			return (
				<tr key={experience._id}>
					<td>{experience.company}</td>
					<td>{experience.title}</td>
					<td>
						<Moment format="YYYY/MM/DD">{experience.from}</Moment>-
						{experience.current ? (
							'Now'
						) : (
							<Moment format="YYYY/MM/DD">{experience.to}</Moment>
						)}
					</td>
					<td>
						<button
							className="btn btn-danger"
							onClick={this.onDeleteClick.bind(
								this,
								experience._id
							)}
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});

		return (
			<div>
				<h4 className="mb-2">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{expData}</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	profile: PropTypes.object.isRequired,
	deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ deleteExperience }
)(Experience);
