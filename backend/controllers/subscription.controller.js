const User = require('../models/user.model.js');

 const getSubscription = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({subscription: user.subscription});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };

const updateSubscription = async (req, res) => {
    const { subscription } = req.body;

    if (!['Basic', 'Premium', 'Business'].includes(subscription)) {
        return res.status(400).send('Invalid subscription value');
      }

    try {
        const user = await User.findById(req.user.id);
        user.subscription = subscription;
        await user.save();
        res.json({subscription: user.subscription});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getSubscription,
    updateSubscription,
};