import { useState } from "react"
import toast from "react-hot-toast";
import axios from 'axios';

const useSearchBooks = () => {
    const [loading,setLoading] = useState(false);
    const [books,setBooks] = useState([]);
    
    const searchBooks = async ({title,genre,author}) => {
       setLoading(true);
     try{
        const res = await axios.get(`/api/book/search?title=${title}&genre=${genre}&author=${author}`,{
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });
        setBooks(res.data);
        
     } catch(error) {
        console.log(error)
        toast.error(error.response.data.message);
     } finally{
        setLoading(false);
     }

    }

    return { searchBooks, books, loading };

}

export default useSearchBooks;