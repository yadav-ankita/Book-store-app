const User=require("../model/user")
const { BadRequestError, NotFoundError } = require('../error');
const { StatusCodes } = require('http-status-codes');
//  Get all cart items
const getAllCartItems = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const user = await User.findById(user_id).populate('cart.book');
    //console.log('user in get all cart items is', user)
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.status(StatusCodes.OK).json({ cartItems: user.cart });
  } catch (error) {
    next(error);
  }
};
//  Add to cart
const addToCart = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const book_id = req.params.id;
    const user = await User.findById(user_id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    user.cart.push({ book: book_id });
    await user.save();
    const user_cart_arr = await User.findById(user_id).populate('cart.book');
    res.status(StatusCodes.OK).json({
      message: "Book added to cart successfully",
      cart: user.cart,
      cart_arr: user_cart_arr.cart
    });
  } catch (error) {
    next(error);
  }
};
// Remove from cart (single item)
const removeFromCart = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const cart_id = req.params.id;
    const user = await User.findById(user_id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const itemIdx=user.cart.findIndex((item)=>item._id.toString()==cart_id);
    if(itemIdx>-1){
          user.cart.splice(itemIdx,1);
          await user.save();
          const user_cart_arr = await User.findById(user_id).populate('cart.book');
          res.status(StatusCodes.OK).json(
            {
                 message:"Item removed Successfully",
                 cart:user.cart,
                 cart_arr:user_cart_arr.cart
            }
          );
    }   
     return res.status(StatusCodes.NOT_FOUND).json({
      message: "Item not found in cart"
    }); 
  } catch (error) {
    next(error);
  }
};
// Clear cart
const clearCart = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const user = await User.findById(user_id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    user.cart = [];
    await user.save();
    res.status(StatusCodes.OK).json({
      message: "Cart cleared successfully",
      cart: []
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCartItems,
  addToCart,
  removeFromCart,
  clearCart
};