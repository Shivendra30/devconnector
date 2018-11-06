import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDeleteClick = id => {
		this.props.deleteEducation(id);
	};

	render() {
		const education = this.props.edu;

		const eduArray = education.map(edu => {
			return (
				<tr key={edu._id}>
					<td>{edu.school}</td>
					<td>{edu.degree}</td>
					<td>
						<Moment format="YYYY/MM/DD">{edu.from}</Moment>-
						{edu.current ? (
							'Now'
						) : (
							<Moment format="YYYY/MM/DD">{edu.to}</Moment>
						)}
					</td>
					<td>
						<button
							className="btn btn-danger"
							onClick={this.onDeleteClick.bind(this, edu._id)}
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});

		return (
			<div>
				<h4 className="mb-2">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{eduArray}</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	profile: PropTypes.object.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ deleteEducation }
)(Education);
