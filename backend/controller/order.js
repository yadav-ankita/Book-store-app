const Order=require('../model/order')
const { NotFoundError } = require('../error')
const {StatusCodes}=require('http-status-codes')

const createOrder=async(req,res,next)=>{
    try {
           const newOrder=await Order.create({...req.body});
           res.status(StatusCodes.CREATED).json({message:"order created successfully",order:newOrder});
    } catch (error) {
         next(error);
    }
}
const getOrderByEmail = async (req, res,next) => {
  try {
    const {email} = req.params;
    const orders = await Order.findOne({email}).sort({createdAt:-1});
    if(!orders) {
         throw new NotFoundError(`Orders not found`)
    }
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
     next(error);
  }
}

module.exports={
     createOrder,
     getOrderByEmail
}