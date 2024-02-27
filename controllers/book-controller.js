// book-controller.js
const db = require('../models/db');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await db.book.findMany();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  const { title, author, genre, pageCount } = req.body;
  try {
    const newBook = await db.book.create({
      data: { title, author, genre, pageCount: parseInt(pageCount, 10) },
    });
    res.json(newBook);
  } catch (error) {
    next(error);
  }
};
exports.updateBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);
  const { title, author, genre, pageCount } = req.body;

  try {
    const updatedBook = await db.book.update({
      where: { id: bookId },
      data: { title, author, genre, pageCount: parseInt(pageCount, 10) },
    });

    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);

  try {
    await db.book.delete({
      where: { id: bookId },
    });

    res.json({ message: 'ลบหนังสือเรียบร้อยแล้ว' });
  } catch (error) {
    next(error);
  }
};
