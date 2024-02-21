const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const borrowsController = require('../controllers/borrows-controller');

router.post('/borrow', authenticate, borrowsController.borrowBook);
router.post('/return/:borrowingId', authenticate, borrowsController.returnBook);

module.exports = router;
