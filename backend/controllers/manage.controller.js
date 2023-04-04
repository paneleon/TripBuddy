const User = require('../models/user.model.js');

exports.getUserData = async (req, res) => {
    try {
      const users = await User.find({ status: 'User' }, 'username email phone'); // Retrieve only username, email, and phone fields
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };