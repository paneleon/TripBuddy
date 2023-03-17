const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const router = new express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error();
    }

    const isMatch = await user.isPasswordMatch(req.body.password);

    if (!isMatch) {
      throw new Error();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Invalid login credentials.' });
  }
});

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
