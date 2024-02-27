// member-router.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const memberController = require('../controllers/member-controller');

router.get('/members', authenticate, memberController.getAllMembers);
router.post('/members', authenticate, memberController.createMember);
router.put('/members/:id', authenticate, memberController.updateMember);
router.delete('/members/:id', authenticate, memberController.deleteMember); 

module.exports = router;
