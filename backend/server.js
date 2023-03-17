// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// const configureDB = require('./config/db.config');
// const configureApp = require('./config/app.config');

// configureDB();
// const app = configureApp();

// app.listen(process.env.PORT || 5000);

// module.exports = app;

// console.log(`Express server is running at ${process.env.URL} on port ${process.env.PORT}`);

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/TripBuddy')

app.post('/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate Email' })
	}
})

app.post('/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				username: user.username,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.listen(5000, () => {
	console.log('Server started on 5000')
})