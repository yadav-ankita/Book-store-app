const mongoose =  require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },  
    category:{
        type: String,
        required: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
        type: String,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
  }, {
    timestamps: true,
  });

  module.exports=mongoose.model('Book', bookSchema);