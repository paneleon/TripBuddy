const User = require('../models/user.model.js');

exports.getUserProfile = async (req, res) => {
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

exports.updateProfile = async (req, res) => {
  const { firstName, lastName, email, address, phone, country, city, postalCode, BOD, sex } = req.body;

  try {
    const user = await User.findById(req.user.id);
        if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (country) user.country = country;
    if (city) user.city = city;
    if (postalCode) user.postalCode = postalCode;
    if (BOD) user.BOD = BOD;
    if (sex) user.sex = sex;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
