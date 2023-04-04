const Notification = require("../models/notification.model");
const User = require("../models/user.model");

exports.createNewNotification = async (req, res) => {
    try {

        const userId = res.locals.userId; // get user id from authentication middleware
        const notification = new Notification({
          notification: req.body.notification,
          email: req.body.email,
          notificationBy: userId
        });
    
        await notification.save();
        return res.status(200).json(notification);
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, message: `Server error: ${error.message}` });
      }
}