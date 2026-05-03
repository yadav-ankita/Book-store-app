const express = require('express')

const router = express.Router();
const upload = require('../middleware/multer.js');
const {
   PostBook,
   getAllBooks,
   deleteBook,
   getSingleBook,
   updateBook
} = require('../controller/book');
const verifyAdminToken = require('../middleware/verifyAdminToken');

router.route('/').post(verifyAdminToken, upload.single("coverImage"), PostBook).get(getAllBooks)

router.route('/:id').get(getSingleBook).delete(verifyAdminToken, deleteBook).patch(verifyAdminToken, upload.single("coverImage"), updateBook);

module.exports = router