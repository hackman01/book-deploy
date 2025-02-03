import { useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";


const useDeleteBook = ()=>{

  const [loading,setLoading] = useState(false);

  const deleteBook = async ({book_id,setBooks,books})=>{
  try{
    setLoading(true);
    const res = await axios.delete(`/api/book/delete?book_id=${book_id}`,{
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== book_id));
    
    toast.success(res.data.message);
  } catch(error){
    toast.error(error.response.data.message);
  } finally{
    setLoading(false);
  }
}

return { deleteBook,loading };

}

export default useDeleteBook;