import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";



const useUpdateBook = () => {
    const [loading,setLoading] = useState(false);
    
    const updateBook = async ({book_id,newBook,books,setBooks}) => {
        setLoading(true);
        try{
      const res = await axios.put(`/api/book/update-book?book_id=${book_id}`,newBook,{
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })

      const updatedBooks = books.map((book)=>{
        if(book._id===res.data._id){
            return res.data;
        }
        return book;
      })
      setBooks(updatedBooks);
      toast.success("Book Updated!");

    } catch(error){
        console.log(error);
       toast.error(error.response.data.message);
    } finally{
        setLoading(false);
    }
    }
    return { updateBook, loading };
}

export default useUpdateBook;