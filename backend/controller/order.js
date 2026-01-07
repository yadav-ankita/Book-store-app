const Order = require('../model/order')
const { NotFoundError } = require('../error')
const { StatusCodes } = require('http-status-codes')

const createOrder = async (req, res, next) => {
     try {
          req.body.userId = req.user.userId;
          const newOrder = await Order.create({ ...req.body });
          res.status(StatusCodes.CREATED).json({ message: "order created successfully", order: newOrder });
     } catch (error) {
          next(error);
     }
}
const getOrders = async (req, res, next) => {
     try {
          const orders = await Order.findOne({ userId: req.user.userId }).sort({ createdAt: -1 });
          if (!orders) {
               throw new NotFoundError(`Orders not found`)
          }
          res.status(StatusCodes.OK).json(orders);
     } catch (error) {
          next(error);
     }
}

module.exports = {
     createOrder,
     getOrders
}