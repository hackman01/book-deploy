import { useState } from "react"
import toast from "react-hot-toast";
import axios from 'axios';



const useFetchRequests = () => {
    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);

    const fetchRequests = async () => {
       setLoading(true);

       try{
        const res = await axios.get('/api/request/get',{
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });
        setRequests(res.data);
       } catch(error) {
        console.log(error);
        toast.error(error.response.data.message);
       } finally {
        setLoading(false);
       }

    }

    return {fetchRequests, requests,setRequests, loading};
}

export default useFetchRequests;