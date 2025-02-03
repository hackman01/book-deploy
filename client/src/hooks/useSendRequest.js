import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios';



const useSendRequest = () => {

    const [loading,setLoading] = useState(false);
    const user = useSelector(state=>state.auth.user);

 
    const sendRequest = async ({bookId,userId,setRequested}) => {

       setLoading(true);

       try{
        const res = await axios.post('/api/request/add',{to_id: userId, user_id: user._id, book_id:bookId},{
            headers : {
                'Content-Type' : "application/json",
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        setRequested(true);
        toast.success("Request sent !")
       } catch(error) {
         toast.error(error.response.data.message);
       } finally {
        setLoading(false);
       }

    }

    return { sendRequest,loading };

}

export default useSendRequest;