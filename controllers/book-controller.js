// book-controller.js
const db = require('../models/db');
const path = require('path');
const fs = require('fs').promises;

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
    // ตรวจสอบว่าโฟลเดอร์ 'uploads' มีอยู่หรือไม่ ถ้าไม่มีให้สร้าง
    await fs.mkdir(path.resolve(__dirname, '../controllers/uploads'), { recursive: true });

    // ตรวจสอบว่ามีการอัปโหลดรูปภาพหรือไม่
    if (!req.file) {
      return res.status(400).json({ error: 'กรุณาอัปโหลดรูปภาพ' });
    }

    const imageBuffer = req.file.buffer;
    const imageName = `${Date.now()}_${req.file.originalname}`;

    // บันทึกไฟล์รูปภาพ
    await fs.writeFile(path.resolve(__dirname, '../controllers/uploads', imageName), imageBuffer);

    const newBook = await db.book.create({
      data: { title, author, genre, pageCount: parseInt(pageCount, 10), image: `/${imageName}` },
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
