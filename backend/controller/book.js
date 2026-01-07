const Book = require('../model/book')
const { BadRequestError, NotFoundError } = require('../error')
const { StatusCodes } = require('http-status-codes')
// get all books
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json({ books });
    } catch (error) {
        next(error);
        console.log("getall book", error)
    }
}
//get single book
const getSingleBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            throw new NotFoundError(`Book not found`)
        }
        res.status(StatusCodes.OK).json({ book })
    } catch (error) {
        next(error)
    }
}
//create a book
const PostBook = async (req, res, next) => {
    try {
        const newBook = await Book.create({ ...req.body });
        // await newBook.save();
        res.status(StatusCodes.CREATED).json({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        next(error)
    }
}
//delete a book
const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new NotFoundError(`No Books found with this id`)
        }
        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        next(error)
    }
}
//update a book
const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        if (title === '') {
            throw new BadRequestError('title  field cannot be empty')
        }
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            throw new NotFoundError(`No Books found with this id`)
        }
        res.status(StatusCodes.OK).json({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getAllBooks,
    getSingleBook,
    PostBook,
    deleteBook,
    updateBook
}
