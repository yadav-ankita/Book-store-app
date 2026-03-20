const User = require("../model/user")
const { BadRequestError, NotFoundError } = require('../error')
const { StatusCodes } = require('http-status-codes')
const getCartItems = async (req, res, next) => {
    console.log("The req.user.userId for this user is ", req.user.userId);
    try {
        const user = await User.findById(req.user.userId).populate("cart");
        if (!user) {
            throw new NotFoundError("User not found");
        }
        res.status(StatusCodes.OK).json({
            cart: user.cart,
            count: user.cart.length
        });
    } catch (error) {
        next(error)
    }
}
const addToCart = async (req, res, next) => {
    console.log("The req.user.userId for this user is ", req.user.userId);
    try {
               const { id: bookId } = req.params;

        const user = await User.findById(req.user.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }
        // prevent duplicate
        if (user.cart.includes(bookId)) {
            throw new BadRequestError("Book already in cart");
        }
        user.cart.push(bookId);
        await user.save();

        res.status(StatusCodes.OK).json({
            message: "Book added to cart",
            cart: user.cart
        });
    } catch (error) {
       next(error)
    }
}

const removeFromCart = async (req, res, next) => {
    console.log("The req.user.userId for this user is ", req.user.userId);
    try {
          const { id: bookId } = req.params;

        const user = await User.findById(req.user.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        user.cart = user.cart.filter(
            (item) => item.toString() !== bookId
        );
        await user.save();

        res.status(StatusCodes.OK).json({
            message: "Book removed from cart",
            cart: user.cart
        });
    } catch (error) {
        next(error)
    }
}

const clearCart = async (req, res, next) => {
    console.log("The req.user.userId for this user is ", req.user.userId);
    try {
           const user = await User.findById(req.user.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        user.cart = [];
        await user.save();

        res.status(StatusCodes.OK).json({
            message: "Cart cleared"
        });

    } catch (error) {
          next(error);
    }
}
module.exports = {
    getCartItems,
    addToCart,
    removeFromCart,
    clearCart
}


