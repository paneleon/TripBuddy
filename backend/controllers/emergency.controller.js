const User = require('../models/user.model.js');

exports.getUserEmergency = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateEmergency = async (req, res) => {
  const { emergencyFirstName, emergencyLastName, emergencyEmail, emergencyPhone } = req.body;

  try {
    const user = await User.findById(req.user.id);
        if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (emergencyFirstName) user.emergencyFirstName = emergencyFirstName;
    if (emergencyLastName) user.emergencyLastName = emergencyLastName;
    if (emergencyEmail) user.emergencyEmail = emergencyEmail;
    if (emergencyPhone) user.emergencyPhone = emergencyPhone;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
