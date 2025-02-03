import { useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";



const useExchange = () => {
    const [loading,setLoading] = useState(false);
     const exchange = async ({request_id,book_id,requests,setRequests})=>{
        setLoading(true);
        try{
            const res = await axios.put(`/api/request/exchange?request_id=${request_id}`,{book_id},{
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            const updatedRequests = requests.map((request)=>{
                if(request._id===res.data.request._id){
                    return res.data.request
                }
                return request;
            })

            setRequests(updatedRequests);
            toast.success(res.data.message);

        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
     }

     return { exchange, loading };
}

export default useExchange;