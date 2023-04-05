const User = require('../models/user.model.js');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(res.locals.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error' + err);
  }
};

exports.updateProfile = async (req, res) => {
  const { firstName, lastName, email, address, phone, country, city, postalCode, BOD, sex } = req.body;

  try {
    const user = await User.findById(res.locals.userId);
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

exports.getSubscribedTo = async (req,res) => {
  try{
      const userId = res.locals.userId;
      const userProfile = await User.findById(userId);
      const subscribedToUsers = await User.find({_id: {$in: userProfile.subscribedTo}});
      return res.status(200).json(subscribedToUsers);
  } catch (error) {
      return res.status(500).send({success: false, message: `Server error: ${error.message}`})
  }
}



exports.updateChecklist = async (req, res) => {
  try {
    const userId =  res.locals.userId;

    const user = await User.findById(userId);

    const newChecklist = req.body;

    await user.update({'$set': {'checklist': newChecklist}});

    return res.status(200).json({success: true, message: `Successfully updated`});
  } catch (error) {
    return res.status(500).send({success: false, message: `Server error: ${error.message}`})
  }
}


exports.getChecklist = async (req, res) => {
  try {
    const userId =  res.locals.userId;
    const user = await User.findById(userId);
    return res.status(200).json(user.checklist);
  } catch (error) {
    return res.status(500).send({success: false, message: `Server error: ${error.message}`})
  }
}
