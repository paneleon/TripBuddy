const User = require('../models/user.model.js');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
}

exports.getUserPayment = async (req, res) => {
    try {
      const user = await User.findById(res.locals.userId);
      if (user.BOD) {
        user.BOD = user.BOD;
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send('Server error');
    }
  };
  
  exports.updatePayment = async (req, res) => {
    const { cardNumber, expirationDate, CVC, firstName, lastName, phone, address, country, city, postalCode, BOD } = req.body;
  
    try {
      const user = await User.findById(res.locals.userId);
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
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send('Server error ' + err);
    }
  };

  exports.deletePayment = async (req, res) => {
    try {
      const user = await User.findById(res.locals.userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      user.cardNumber = undefined;
      user.expirationDate = undefined;
      user.CVC = undefined;
      user.BOD = undefined;
  
      await user.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send('Server error ' + err);
    }
  };