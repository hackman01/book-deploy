import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const useAddBook = () => {
    
    const [book,setBook] = useState({});
    const [loading,setLoading] = useState(false);

    const addBook = async ({title,author,genre})=>{

        setLoading(true);

        try{
            const res = await axios.post(`/api/book/add`,{title,author,genre},{
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
                
                setBook(res.data);
                toast.success("Successfully added the book!")
                
            
        } catch(error){
          console.log(error);
           toast.error(error.response.data.message);

        } finally {
            setLoading(false);
        }
    }

    return { addBook, book , loading };

}

export default useAddBook;