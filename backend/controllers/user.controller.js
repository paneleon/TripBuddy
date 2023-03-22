const passport = require('passport');
const authUtils = require('../utils/auth.js');
const User = require('../models/user.model');
const imageUpload = require('../config/imageUpload.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const useNavigate = require('react-router-dom');

exports.getAuthImageUploadData = (req, res) => { // function for uploading images
  const result = imageUpload.getAuthenticationParameters()
  res.send(result);
}

exports.subscribeToContentProvider = async (req, res) => {
  try {
    const contentProviderId = req.params.id;
    const userId =  res.locals.userId;

    const contentProvider = await User.findById(contentProviderId)
    if (!contentProvider){
      return res.status(404).send({success: false, message: `Invalid content provider id`})
    }

    const user = await User.findById(userId)
    if (user?.subscribedTo?.includes(contentProviderId)){
      return res.status(409).send({success: false, message: `User is already subscribed to this content provider`})
    }

    await User.updateOne({_id: userId}, {$push: {subscribedTo: contentProviderId}})

    return res.status(200).json({success: true, message: `Successfully subscribed`});
  } catch (error) {
    return res.status(500).send({success: false, message: `Server error: ${error.message}`})
  }
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  res.json({ msg: 'Logout successful' });
  useNavigate('/home');
};
