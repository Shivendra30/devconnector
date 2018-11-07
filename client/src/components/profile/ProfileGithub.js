import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { authCredentials } from '../../utils/authCredentials';

class ProfileGithub extends Component {
	constructor() {
		super();
		this.state = {
			clientID: authCredentials.clientID,
			clientSecret: authCredentials.clientSecret,
			count: 5,
			sort: 'created: asc',
			repos: []
		};
	}

	componentDidMount = () => {
		const { count, clientID, clientSecret, sort } = this.state;
		axios
			.get(
				`https://api.github.com/users/${
					this.props.githubusername
				}/repos?per_page=${count}?&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
			)
			.then(res => this.setState({ repos: res.data }))
			.catch(console.log);
	};

	render() {
		const { repos, count } = this.state;
		console.log(repos.slice(0, count));
		const repoArray = repos.slice(0, count).map(repo => {
			return (
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-6">
							<h4>
								<a
									href={repo.html_url}
									className="text-info"
									target="_blank"
								>
									{' '}
									{repo.name}
								</a>
							</h4>
							<p>{repo.description && repo.description}</p>
						</div>

						<div className="col-md-6">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers_count}
							</span>
							<span className="badge badge-success">
								Forks: {repo.forks_count}
							</span>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div ref="myRef">
				<hr />
				<h3 className="mb-4">Latest Github Repos</h3>
				{repoArray}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	githubusername: PropTypes.string.isRequired
};

export default ProfileGithub;
