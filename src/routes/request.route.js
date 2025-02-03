// routes/request.js
const express = require('express');
const router = express.Router();
const { 
   addRequest, 
   deleteRequest, 
   exchange, 
   getRequest
} = require('../controllers/request.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


router.post('/add', authMiddleware, addRequest);
router.delete('/delete', authMiddleware, deleteRequest);
router.put('/exchange', authMiddleware, exchange);
router.get('/get', authMiddleware, getRequest)

module.exports = router;

