const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	const newUser = new User({ name, email, password });

	newUser.save((err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error registering user');
		} else {
			res.send('User registered successfully');
		}
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});