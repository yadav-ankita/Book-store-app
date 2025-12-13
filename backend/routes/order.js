const express=require('express')

const {createOrder,getOrderByEmail}=require("../controller/order")

const router=express.Router();

router.route("/").post(createOrder);

router.route("/email/:email").get(getOrderByEmail);

module.exports=router