const Notification = require("../models/notification.model");
const User = require("../models/user.model");

const createNotification = async (userId) => {
  const notification = new Notification({
    notification: req.body.notification,
    email: req.body.email,
    notificationFor: userId
  });

  await notification.save();
  return notification;
}

exports.createNewNotification = async (req, res) => {
    try {
        const userId = res.locals.userId; // get user id from authentication middleware
        const notification = await createNotification(userId)
        return res.status(200).json(notification);
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, message: `Server error: ${error.message}` });
      }
}

exports.getNewNotifications = async (req, res) => {
  try {
      const userId = res.locals.userId; // get user id from authentication middleware
      const notifications = await Notification.find({notificationFor: userId, isRead: false})
      return res.status(200).json(notifications);
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: `Server error: ${error.message}` });
    }
}

exports.createNewNotification = createNotification