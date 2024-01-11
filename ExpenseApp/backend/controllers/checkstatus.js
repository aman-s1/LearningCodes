const Order = require('../models/orders');
const User = require('../models/users');

const getUserOrders = async (userId) => {
    try {
      // Find user by userId
      const user = await User.findByPk(userId);
  
      if (!user) {
        return null; // User not found
      }
  
      // Retrieve all orders for the user
      const orders = await Order.findAll({
        where: {
          userId: userId,
        },
      });
  
      return { user, orders };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve user orders');
    }
};

const checkPremiumStatus = async (userId) => {
    try {
      // Retrieve user and orders
      const { user, orders } = await getUserOrders(userId);
  
      if (!user) {
        return null; // User not found
      }
  
      // Check if there is at least one successful order
      const isPremium = orders.some((order) => order.status === 'SUCCESSFUL');
  
      return { status: 200, user, isPremium };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to check premium status');
    }
};

module.exports = {
    checkPremiumStatus
};