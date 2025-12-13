const express=require('express')

const router=express.Router();

const {
   PostBook,
   getAllBooks,
   deleteBook,
   getSingleBook,
   updateBook
}=require('../controller/book')

router.route('/').post(PostBook).get(getAllBooks)

router.route('/:id').get(getSingleBook).delete(deleteBook).patch(updateBook);

module.exports=router