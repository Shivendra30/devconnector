const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');


// @route 	GET api/posts/test
// @desc 	Tests posts route
// @acess 	Public
router.get('/test', (req, res) => {
	res.json({msg: "POsts Works"});
})
// @route 	POST api/posts/
// @desc 	create posts
// @acess 	Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validatePostInput(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name, 
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then(post => res.json(post)).catch(err => res.status(400).json(err));
})

// @route 	GET api/posts/
// @desc 	get posts
// @acess 	Public
router.get('/', (req, res)=>{
	Post.find()
	.sort({date: -1})
	.then(posts =>res.json(posts))
	.catch(err => res.status(404).json({nopostsfound: "No posts found"}));
})

// @route 	GET api/posts/:id
// @desc 	get posts by id
// @acess 	Public
router.get('/:id', (req, res)=>{
	Post.findById(req.params.id)
	.then(post =>res.json(post))
	.catch(err => res.status(404).json({nopostfound: "No post found with that ID"}));
})

// @route 	DELETE api/posts/:id
// @desc 	delete posts by id
// @acess 	Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Post.findById(req.params.id).then(post => {
			//Check post owner
			if(post.user.toString() !== req.user.id){
				return res.status(401).json({notauthorized: "User not authorized"});
			}

			//Delete
			post.remove().then(() => res.json({success: true})).catch(err => res.status(404).json({nopostfound: "Nopost Found"}));
		})	
})

// @route 	POST api/posts/like/:id
// @desc 	Like posts
// @acess 	Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
	Profile.findOne({user: req.user.id})
	.then(profile => {
		Post.findById(req.params.id).then(post => {
			//Check if user has already liked the post
			const likes = post.likes.filter(like => like.user.toString() === req.user.id);
			if(likes.length > 0){
				return res.status(400).json({alreadyLiked: "User already liked this post"});
			}
			post.likes.unshift({user: req.user.id});

			post.save().then(post => res.json(post));
		})
	}).catch(err => res.status(404).json({nopostfound: "No post found"}))
})


// @route 	POST api/posts/unlike/:id
// @desc 	Unlike posts
// @acess 	Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
	Profile.findOne({user: req.user.id})
	.then(profile => {
		Post.findById(req.params.id).then(post => {
			//Check if user has already liked the post
			const likes = post.likes.filter(like => like.user.toString() === req.user.id);
			if(likes.length === 0){
				return res.status(400).json({notLiked: "You have not yet liked this post"});
			}
			const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
			post.likes.splice(removeIndex, 1);
			post.save().then(post => res.json(post));

		})
	}).catch(err => res.status(404).json({nopostfound: "No post found"}))
})

// @route 	POST api/posts/comment/:id
// @desc 	Comment on a post
// @acess 	Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
	
	const {errors, isValid} = validatePostInput(req.body);
	
	if(!isValid){
		res.status(400).json(errors);
	}

	Post.findById(req.params.id).then(post => {
		// console.log('This is a godamn post',post);
		//Make a new comment object
		const newComment = {
			text: req.body.text,
			name: req.body.name, 
			avatar: req.body.avatar, 
			user: req.user.id
		}
		//Add the new comment to the array
		post.comments.unshift(newComment);
		post.save()
		.then(post => res.json(post))
		.catch(err => res.status(404).json(err));

	}).catch({nopostfound: "No post found"})
});

// @route 	DELETE api/posts/comment/:id/:comment_id
// @desc 	DLETE comment on a post
// @acess 	Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res)=>{
	

	Post.findById(req.params.id).then(post => {
		//Check to see if the comment exists
		if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
			res.status(404).json({commentnotexists: "Comment does not exist"});
		}
		//get remove index
		const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);

		post.comments.splice(removeIndex, 1);

		post.save().then(post => res.json(post)).catch(err => res.status(400).json(err));

	}).catch({nopostfound: "No post found"})
});


module.exports = router;