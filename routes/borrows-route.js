// borrows-route.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const borrowsController = require('../controllers/borrows-controller');

router.get('/borrows', authenticate, borrowsController.getBorrows);
router.get('/borrows/:borrowingId', authenticate, borrowsController.getBorrowById);
router.post('/borrows', authenticate, borrowsController.borrowBook);
router.post('/return/:borrowingId', authenticate, borrowsController.returnBook);
router.put('/borrows/:borrowingId', authenticate, borrowsController.updateBorrow);
router.delete('/borrows/:borrowingId', authenticate, borrowsController.deleteBorrow);

module.exports = router;