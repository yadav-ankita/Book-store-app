const express=require('express');
const router=express.Router();
const {
        getAllCartItems,
        addToCart,
        removeFromCart,
        clearCart
}=require('../controller/cart');
router.get("/",getAllCartItems);
router.post("/:id",addToCart);
router.delete("/:id",removeFromCart);
router.delete("/",clearCart);

module.exports=router;