const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB congfig
const db = require('./config/keys').mongoURI;
//Connect to MongoDB
mongoose
	.connect(db)
	.then(() => {
		console.log('Connected to MongoDb');
	})
	.catch(err => {
		console.log(err);
	});

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//Passport Middleware
app.use(passport.initialize());

//Passport Strategy (JWT)
require('./config/passport.js')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('/client/build'));
	//Load the index.html file for any route that we hit
	app.get('*', (req, res) => {
		res.sendFile(path.resolved(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
