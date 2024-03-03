const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const bookController = require('../controllers/book-controller');
const path = require('path');

// Import middleware
const { uploadImage } = require('../middlewares/uploadImage');

router.get('/books', authenticate, bookController.getAllBooks);
router.post('/books', authenticate, uploadImage, bookController.createBook);
router.put('/books/:id', authenticate, bookController.updateBook);
router.delete('/books/:id', authenticate, bookController.deleteBook);

// เพิ่ม endpoint สำหรับแสดงรูปภาพ
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.resolve(__dirname, '../controllers/uploads', imageName));
});

module.exports = router;
