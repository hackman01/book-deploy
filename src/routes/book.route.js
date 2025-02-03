const express = require('express');
const router = express.Router();
const { 
   addBook, 
   searchBooks, 
   searchBooksByLists, 
   deleteBook, 
   getBooksByUserId, 
   updateBook
} = require('../controllers/book.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


router.post('/add', authMiddleware, addBook);
router.put('/update-book', authMiddleware, updateBook);
router.get('/search', authMiddleware ,searchBooks);
router.post('/search-by-lists',authMiddleware, searchBooksByLists);
router.delete('/delete', authMiddleware, deleteBook);
router.get('/user-books',authMiddleware, getBooksByUserId);

module.exports = router;