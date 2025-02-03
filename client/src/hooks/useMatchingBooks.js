import { useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from 'axios';



const useMatchingBooks = () => {
    const [loading,setLoading] = useState(false);
    const [books,setBooks] = useState([]);

    const user = useSelector(state=>state.auth.user);

    const fetchMatchingBooks = async () => {
        setLoading(true);
        try{
            const res = await axios.post(`/api/book/search-by-lists`,{authors:user.authorPreferences,genres:user.genrePreferences},{
                headers : {
                    'Content-Type' : "application/json",
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            setBooks(res.data);
        } catch(error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return { fetchMatchingBooks, loading, books };

}

export default useMatchingBooks;