const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
         type:mongoose.Types.ObjectId,
         ref:'User', 
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
        Country:{
            type:String,
            required: true,
        },
        State:{
            type:String,
            required: true,
        },
       Zipcode:{
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
