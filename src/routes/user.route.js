const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const { addToFavorite, deleteFromFavorite } = require('../controllers/user.controller');

router.get('/add-to-favorite', authMiddleware ,addToFavorite);
router.get('/delete-from-favorite', authMiddleware, deleteFromFavorite);

module.exports = router;