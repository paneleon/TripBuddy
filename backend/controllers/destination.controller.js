const passport = require("passport");
const authUtils = require("../utils/auth.js");
const Destination = require("../models/destination.model");

exports.createDestination = async (req, res, next) => {
  try {
    if (!req.body.destinationAddress) {
      return res.json({
        success: false,
        message: "Error: destination address is required",
      });
    }
    const destination = await Destination.create({
      destinationAddress: req.body.destinationAddress,
      description: req.body.description || 'N/A',
      createdBy: res.locals.userId
    });
    return res.json({ success: true, data: destination });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "ERROR: Failed to create the destination!",
    });
  }
};

exports.getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({
      createdBy: res.locals.userId
    }).exec();
    return res.json({ success: true, data: destinations });
  } catch (err) {
    return res.json({
      success: false,
      message: "ERROR: Failed to get destinations!",
    });
  }
};


exports.deleteDestinations = async (req, res, next) => {
  try {
    const destination = await Destination.deleteOne({
      _id: req.params.destinationId
    }).exec();
    return res.json({ success: true, data: destination });
  } catch (err) {
    return res.json({
      success: false,
      message: "ERROR: Failed to delete destinations!",
    });
  }
};
