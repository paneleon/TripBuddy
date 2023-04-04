const User = require('../models/user.model.js');

exports.getUserEmergency = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findById(userId)
    const emergencyContacts = await User.find({_id: {$in: user.emergencyContacts}}).select('-password');
    return res.status(200).send(emergencyContacts);
  } catch (err) {
    res.status(500).send({message: 'Server error'});
  }
};

exports.addEmergencyContact = async (req, res) => {
  try {
    const emergencyContact = await User.findOne({email: req.params.email})

    if (!emergencyContact){
      return res.status(404).send({success: false, message: "Emergency contact was not found by this email"});
    }
    await User.updateOne({_id: res.locals.userId}, {$push: {emergencyContacts: emergencyContact._id}})
    const user = await User.findById(res.locals.userId)
    console.log("------ user?.emergencyContacts", user?.emergencyContacts)
    return res.status(200).send(user?.emergencyContacts);


  } catch (err) {
    res.status(500).send({message: 'Server error'});
  }
};

exports.removeEmergencyContact = async (req, res) => {
  try {
    await User.updateOne({_id: res.locals.userId}, {$pull: {emergencyContacts: req.params.id}})
    const user = await User.findById(res.locals.userId)
    return res.status(200).send(user?.emergencyContacts);
  } catch (err) {
    res.status(500).send({message: 'Server error'});
  }
};

