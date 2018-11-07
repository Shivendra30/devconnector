import React, { Component } from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

class CommentFeed extends Component {
	render() {
		const { comments, postId } = this.props;
		const commentsArray = comments.map(comment => {
			return (
				<CommentItem
					comment={comment}
					key={comment._id}
					postId={postId}
				/>
			);
		});

		return <div className="comments">{commentsArray}</div>;
	}
}

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired
};

export default CommentFeed;
