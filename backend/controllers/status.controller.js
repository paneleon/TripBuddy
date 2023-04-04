const User = require('../models/user.model.js');

exports.getStatus = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({status: user.status});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };

exports.updateStatus = async (req, res) => {
    const { status } = req.body;

    if (!['User', 'IT', 'Security'].includes(status)) {
        return res.status(400).send({status});
      }

    try {
        const user = await User.findById(req.user.id);
        user.status = status;
        
        await user.save();
        res.json({status: user.status});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};