const express = require('express');
const mongoose = require('mongoose');

//DB congfig
const db = require('./config/keys').mongoURI;
//Connect to MongoDB
mongoose.connect(db)
.then(() => {console.log('Connected to MongoDb')})
.catch((err) => {console.log(err)});

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

app.get('/', (req, res) => {
	res.send("Hello");
})

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})