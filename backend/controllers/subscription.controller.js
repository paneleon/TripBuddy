const User = require('../models/user.model.js');

exports.getSubscription = async (req, res) => {
    try {
      const user = await User.findById(res.locals.userId);
      return res.status(200).send({subscription: user.subscription});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error ' + err);
    }
  };

exports.updateSubscription = async (req, res) => {
    const { subscription } = req.body;

    if (!['Basic', 'Premium', 'Business'].includes(subscription)) {
        return res.status(400).send({subscription});
      }

    try {
        await User.updateOne({_id: res.locals.userId}, {subscription: subscription});
        const user = await User.findById(res.locals.userId);
        return res.status(200).send({subscription: user.subscription});    
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error ' + err);
    }
};