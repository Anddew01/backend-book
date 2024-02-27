// book-router.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const bookController = require('../controllers/book-controller');

router.get('/books', authenticate, bookController.getAllBooks);
router.post('/books', authenticate, bookController.createBook);
router.put('/books/:id', authenticate, bookController.updateBook);
router.delete('/books/:id', authenticate, bookController.deleteBook); 

module.exports = router;
