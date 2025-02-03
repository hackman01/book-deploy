const User = require('../models/user.model');
const Book = require('../models/book.model');

const addToFavorite = async (req,res) => {

    try {
        const { bookId } = req.query;
        const userId = req.user._id;  
    
        
        const book = await Book.findById(bookId);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
       
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
       
        if (user.favorites.includes(bookId)) {
          return res.status(400).json({ message: 'Book already in favorites' });
        }
    
        
        user.favorites.push(bookId);

        if (!user.genrePreferences.includes(book.genre)) {
            user.genrePreferences.push(book.genre);
        }

       
        if (!user.authorPreferences.includes(book.author)) {
            user.authorPreferences.push(book.author);
        }

        await user.save();
    
        res.json({ message: 'Book added to favorites!', favorites: user.favorites });
      } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ message: 'Server error' });
      }

}

const deleteFromFavorite = async (req, res) => {
    try {
      const { bookId } = req.query;
      const userId = req.user._id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      user.favorites = user.favorites.filter(id => id.toString() !== bookId);
      await user.save();
  
      res.json({ message: 'Book removed from favorites', favorites: user.favorites });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = { addToFavorite,deleteFromFavorite };