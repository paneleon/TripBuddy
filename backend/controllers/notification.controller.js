const Notification = require("../models/notification.model");
const User = require("../models/user.model");

exports.deleteNotification = async (req, res) => {
    try {
      const notificationId = req.params.id;
      const notification = await Notification.findById(notificationId);
      if (!notification) {
        return res.status(404).send({ success: false, message: `Notification not found` })
      }
      await Notification.deleteOne({ _id: notificationId });
      return res.status(200).json({ success: true, message: `Notification was successfully deleted` });
    } catch (error) {
      return res.status(500).send({ success: false, message: `Server error: ${error.message}` });
    }
  }