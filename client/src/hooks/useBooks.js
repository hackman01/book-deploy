import { useState } from "react"
import toast from "react-hot-toast";
import axios from 'axios';

const useBooks = () => {
    const [loading,setLoading] = useState(false);
    const [books,setBooks] = useState([]);

    

    const fetchBooks = async ({user_id})=>{

        setLoading(true);
        try{
            
            const res = await axios.get(`/api/book/user-books?userId=${user_id}`,{
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
           
            setBooks(res.data);
        } catch(error){
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        
    }



    return {fetchBooks, books,setBooks, loading};


}

export default useBooks;