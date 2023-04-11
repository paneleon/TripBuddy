const User = require('../models/user.model.js');
const { createNotification } = require('./notification.controller.js');

exports.getUserEmergency = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findById(userId)
    const emergencyContacts = await User.find({_id: {$in: user.emergencyContacts}}).select('-password');
    return res.status(200).json(emergencyContacts);
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
    await createNotification(res.locals.userId, `New emergency contact was added: ${req.params.email}`)
    const user = await User.findById(res.locals.userId)
    return res.status(200).json(user?.emergencyContacts);


  } catch (err) {
    res.status(500).send({success: false, message: 'Server error' + err});
  }
};

exports.removeEmergencyContact = async (req, res) => {
  try {
    await User.updateOne({_id: res.locals.userId}, {$pull: {emergencyContacts: req.params.id}})
    await createNotification(res.locals.userId, `Emergency contact was successfully removed`)
    const user = await User.findById(res.locals.userId)
    return res.status(200).json(user?.emergencyContacts);
  } catch (err) {
    res.status(500).send({message: 'Server error' + err});
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const messageTo = req.params.id;
    const messageFrom = await User.findById(res.locals.userId);
    const message = req.body.message;
  
    await createNotification(messageTo, `You received a message from ${messageFrom?.username}: ${message}`)
    return res.status(200).json({success: true, message: "Message sent"});
  } catch (err){
    res.status(500).send({message: 'Server error' + err});
  }
}

