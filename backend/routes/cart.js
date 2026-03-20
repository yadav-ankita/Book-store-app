const express=require('express');
const router=express.Router();
const {
        getCartItems,
        addToCart,
        removeFromCart,
        clearCart
}=require('../controller/cart');
router.get("/",getCartItems);
router.post("/:id",addToCart);
router.delete("/:id",removeFromCart);
router.delete("/",clearCart);

module.exports=router;