const User = require('../models/user.model.js');

exports.getUserPayment = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (user.BOD) {
        user.BOD = user.BOD;
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
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
      if (BOD) user.BOD = BOD;
  
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };