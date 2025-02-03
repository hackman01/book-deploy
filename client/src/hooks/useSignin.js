import { useDispatch,useSelector } from "react-redux";
import { loginStart,loginFailure,loginSuccess } from "../state/authSlice";
import axios from "axios";
import toast from "react-hot-toast";


const useSignin = () => {

   const dispatch = useDispatch();
   const auth = useSelector((state)=>state.auth)
   const signin = async ({email,password}) => {

    dispatch(loginStart());
   try{
    const res = await axios.post("/api/auth/signin", {email,password});
    dispatch(loginSuccess(res.data.user));
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user',JSON.stringify(res.data.user));
   console.log(res)
    toast.success('SignIn Succesfull');
   } catch(error) {
      console.log(error)
      dispatch(loginFailure(JSON.stringify(error)))
      toast.error(error?.response?.data?.message)
   } 

   }
   
    return {signin, loading : auth.loading, error: auth.error };
}

export default useSignin;