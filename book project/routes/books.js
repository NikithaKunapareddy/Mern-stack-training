const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET ALL BOOKS
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ADD NEW BOOK
router.post("/", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET BOOK BY ID
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE BOOK
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE BOOK
router.delete("/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
