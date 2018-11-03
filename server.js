const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB congfig
const db = require('./config/keys').mongoURI;
//Connect to MongoDB
mongoose.connect(db)
.then(() => {console.log('Connected to MongoDb')})
.catch((err) => {console.log(err)});

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})