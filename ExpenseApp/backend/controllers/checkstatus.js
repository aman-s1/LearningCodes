// controllers/checkstatus.js

const User = require('../models/users');

const checkPremiumStatus = async (userId) => {
  try {
      // Retrieve user
      const user = await User.findByPk(userId);

      if (!user) {
          return { status: 404, message: 'User not found' };
      }

      // Check if the user is a premium user
      const isPremium = user.ispremiumuser.toLowerCase() === 'true';

      return { status: 200, isPremium };
  } catch (error) {
      console.error(error);
      return { status: 500, message: 'Failed to check premium status' };
  }
};


module.exports = {
    checkPremiumStatus
};
