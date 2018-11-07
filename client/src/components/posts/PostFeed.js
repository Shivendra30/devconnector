import React, { Component } from 'react';
import PostItem from './PostItem';
import PropTypes from 'prop-types';

class PostFeed extends Component {
	render() {
		const { posts } = this.props;
		const postArray = posts.map(post => {
			return <PostItem post={post} key={post._id} />;
		});

		return <div className="posts">{postArray}</div>;
	}
}

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default PostFeed;
