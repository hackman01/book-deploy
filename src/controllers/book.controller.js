const Book = require('../models/book.model');
const Request = require('../models/request.model');

const addBook = async (req, res) => {
    try {
        const { title, genre, author } = req.body;
        const user_id = req.user._id;

        if (!title || !genre || !author) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newBook = new Book({
            title,
            genre,
            author,
            user_id
        });

        await newBook.save();
        res.status(201).json(newBook);

    } catch (error) {

        res.status(500).json({
            message: 'Error adding book',
            error: error.message
        });
    }
};

const updateBook =  async (req,res)=>{

    const { book_id } = req.query;
    const user = req.user;
    const {title,author,genre} = req.body;
    const query = {};
    if(title){
        query.title = title;
    }
    if(genre){
        query.genre = genre;
    }
    if(author){
        query.author = author;
    }
    try{
         const update = await Book.findOneAndUpdate({_id:book_id,user_id:user._id},query,{ new: true });
         if(!update){
            return res.status(404).json({message:"Book not found!!"});
         }
         res.status(200).json(update);
    } catch(error){
        res.status(500).json({
            message: "Server Error!",
            error: error.message
        })
    }

} 

const searchBooks = async (req, res) => {
    try {
        const { title, author, genre } = req.query;
        const user = req.user
        const query = {};

        
        if (title) {
            query.title = { $regex: title, $options: 'i' };  
        }
        if (author) {
            query.author = { $regex: author, $options: 'i' };
        }
        if (genre) {
            query.genre = { $regex: genre, $options: 'i' };
        }

        query.exchanged = false;
        query.user_id = { $ne: user._id };
        const books = await Book.find({...query})
            .populate('user_id', 'name email')  
            .sort({ createdAt: -1 }); 

        res.json(books);

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching books' });
    }
};


const searchBooksByLists = async (req, res) => {
    try {
        const { genres, authors } = req.body;
        const user = req.user;
        const query = {};

        
        if (genres && genres.length > 0) {
            query.genre = { $in: genres }; 
        }

        
        if (authors && authors.length > 0) {
            query.author = { $in: authors }; 
        }
        query.exchanged = false;

        const alreadyRequested = await Request.find({by_id:user._id});
        const alreadyRequestedIds = alreadyRequested.map((request)=>{ return request.book_id});

        const books = await Book.find({...query, _id : {$nin : alreadyRequestedIds},user_id : {$ne : user._id}})
            .populate('user_id', 'name email')
            .sort({ createdAt: -1 });

      

        res.json(books);

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching books' });
    }
};

const deleteBook = async (req,res) => {
    try{
        const { book_id } = req.query;
        const user_id = req.user._id;

        if(!book_id){
            return res.status(400).json({
                message: "Book id not provided"
            })
        }

        const delBook = await Book.findOneAndDelete({ _id: book_id, user_id });

        if (!delBook) {
            return res.status(400).json({
                message: "Book not found or you are not allowed to delete this book"
            });
        }
        
        res.status(200).json({
            message: "Successfully deleted the book!",
            delBook
        });

    } catch(error) {
        res.status(500).json({
            message: "Failed to delete the book",
            error: error.message
        })
    }
}

const getBooksByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const books = await Book.find({ user_id: userId,exchanged : false });

        if (!books.length) {
            return res.status(404).json({ message: "No books found for this user"});
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve books",
            error: error.message
        });
    }
};

module.exports = { addBook,searchBooks,updateBook,searchBooksByLists,deleteBook,getBooksByUserId };