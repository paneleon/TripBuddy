const User = require('../models/user.model.js');

exports.getUserPayment = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (user.BOD) {
        user.BOD = formatDate(user.BOD);
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
      }

  };
  
  exports.updatePayment = async (req, res) => {
    const { cardNumber, expirationDate, CVC, firstName, lastName, phone, address, country, city, postalCode, BOD } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (cardNumber) user.cardNumber = cardNumber;
      if (expirationDate) user.expirationDate = expirationDate;
      if (CVC) user.CVC = CVC;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phone) user.phone = phone;
      if (address) user.address = address;
      if (country) user.country = country;
      if (city) user.city = city;
      if (postalCode) user.postalCode = postalCode;
      if (BOD) user.BOD = formatDate(BOD);
  
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
      }

  };

  exports.deletePayment = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      user.cardNumber = undefined;
      user.expirationDate = undefined;
      user.CVC = undefined;
      user.firstName = undefined;
      user.lastName = undefined;
      user.phone = undefined;
      user.address = undefined;
      user.country = undefined;
      user.city = undefined;
      user.postalCode = undefined;
      user.BOD = undefined;
  
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };