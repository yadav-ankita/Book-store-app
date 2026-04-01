const mongoose =  require('mongoose');
const orderSchema = new mongoose.Schema({
    userId:{
         type:mongoose.Types.ObjectId,
         ref:'User', 
         required:true,   
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    bookIds:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    address: {
        city: {
            type: String,
            required: true,
        },
        country:{
            type:String,
            required: true,
        },
        state:{
            type:String,
            required: true,
        },
       zipcode:{
         type:String,
         required: true,
       }   
    },
    phone: {
        type: Number,
        required: true,
    }, 
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default:'Orders Placed',
        enum: ['Orders Placed','Out for delivery', 'Delivered', 'Cancelled'],
    },
}, {
    timestamps: true,
})
module.exports=mongoose.model('Order',orderSchema);
