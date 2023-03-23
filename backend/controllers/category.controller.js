const passport = require("passport");
const authUtils = require("../utils/auth.js");
const { Category } = require("../constants/index");

exports.getCategorys = async (req, res, next) => {
  try {
    return res.json({ success: true, data: Category });
  } catch (err) {
    return res.json({
      success: false,
      message: "ERROR: Failed to get categorys!",
    });
  }
};
