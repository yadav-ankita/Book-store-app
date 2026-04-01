const express=require('express')

const router=express.Router();

const {
   PostBook,
   getAllBooks,
   deleteBook,
   getSingleBook,
   updateBook
}=require('../controller/book');
const verifyAdminToken = require('../middleware/verifyAdminToken');

router.route('/').post(verifyAdminToken,PostBook).get(getAllBooks)

router.route('/:id').get(getSingleBook).delete(verifyAdminToken,deleteBook).patch(verifyAdminToken,updateBook);

module.exports=router