const Request = require('../models/request.model');
const Book = require('../models/book.model');


const getRequest = async (req,res) => {

    try{
        const user_id = req.user._id;
        const requests = await Request.find({$or: [{ by_id: user_id }, { to_id: user_id }]})
        .populate('book_id')
        .populate("to_id","name email")
        .populate("by_id","name email")
        .sort({createdAt : -1})
        if(!requests || requests.length===0){
            return res.status(400).json({
                message: "No new requests!"
            })
        }

        res.status(200).json(requests)

    } catch(error) {
        res.status(500).json({
            message: "Can't fetch the requests",
            error: error.message
        })
    }

}

const addRequest = async (req, res) => {
    try {

        const user_id = req.user._id
        const { to_id, book_id } = req.body;

        const request = await Request.exists({book_id,by_id:user_id})

        if(request){
            return res.status(400).json({
                message: "Book is already requested !"
            })
        }

        const newRequest = Request({
            to_id,
            by_id : user_id,
            book_id
        })
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({
            message: "Failed to request",
            error: error.message
        })
    }
}

const deleteRequest = async (req, res) => {
    try {
        const { requestId } = req.query;
        const deletedRequest = await Request.findByIdAndDelete(requestId);

        if (!deletedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete request",
            error: error.message
        });
    }
};


const exchange = async (req, res) => {

    try {
        const user = req.user;
        const { request_id } = req.query;
        const { book_id } = req.body;

        if (!request_id) {
            return res.status(400).json({
                message: "Request id not provided"
            })
        }

        

        const del = await Book.findByIdAndUpdate(book_id,{exchanged : true},{ new: true })
        if (!del) {
            return res.status(400).json({
                message: "Book not found or you are not authorized"
            })
        }

        const request = await Request.findByIdAndUpdate(request_id, { status: "accepted" }, { new: true })
        .populate("to_id","name email")
        .populate("by_id","name email")
        .populate("book_id");

        if (!request) {
            return res.status(404).json({
                message: "Request not found",
            })
        }

        res.status(201).json({
            message: "Exchange sucessful!!",
            request
        })

    } catch (error) {
        res.status(500).json({
            message: "Exchange Failed",
            error: error.message
        })
    }

}

module.exports = { addRequest, deleteRequest, exchange, getRequest };