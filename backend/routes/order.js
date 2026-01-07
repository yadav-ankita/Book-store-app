const express=require('express')

const {createOrder,getOrders}=require("../controller/order")

const router=express.Router();

router.route("/").post(createOrder).get(getOrders);

module.exports=router