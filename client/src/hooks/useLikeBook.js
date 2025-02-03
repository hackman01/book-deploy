import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';


const useLikeBook = ()=>{

    const [lloading,setLoading] = useState(false);

   const likeBook = async ({favorites,bookId,setFavorites})=>{


       setLoading(true);
       try{
         const res = await axios.get(`/api/user/${favorites.includes(bookId) ? "delete-from-favorite" : "add-to-favorite"}?bookId=${bookId}`,{
            headers : {
                'Content-Type' : "application/json",
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
         })

          setFavorites(res.data.favorites);
          toast.success(res.data.message);

       } catch(error){
        toast.error(error.response.data.message);
       } finally{
        setLoading(false);
       }

   }

   return { likeBook,lloading };

}

export default useLikeBook;