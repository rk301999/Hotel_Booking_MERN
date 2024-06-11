import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8000/api/";
const Login = () => {

    const [credentials,setCredentials] = useState({
        username : undefined,
        password : undefined,
    })

    const {auth,setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setCredentials(prev=>{
            return{
                ...prev,
                [e.target.id]:e.target.value
            }
        })
    }

    const handleClick=async (e)=>{
        e.preventDefault();
        const UPDATED_AUTH_LOGIN ={
            user:undefined,
            loading : true,
            error : undefined,
        }
        setAuth(UPDATED_AUTH_LOGIN);
        try {
            const res = await axios.post("/auth/login",credentials)
            console.log(res);
            const UPDATED_AUTH_SUCCESS ={
                user:res.data,
                loading : false,
                error : undefined,
            }
            setAuth(UPDATED_AUTH_SUCCESS);
            console.log("user hai ye",auth);
            navigate("/")
        } catch (error) {
            const UPDATED_AUTH_FAILURE ={
                user:undefined,
                loading : false,
                error : error.message,
            }
            setAuth(UPDATED_AUTH_FAILURE);
        }
    }
    

    return (
        <div className="login h-[100vh] flex items-center justify-center">
          <div className="lContainer flex flex-col gap-3">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput px-2 py-1 border-2 "
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput px-2 py-1 border-2"
            />
            <button  onClick={handleClick} disabled={auth.loading} className="lButton border-none px-2 py-1 bg-[#0071c2] text-white font-bold cursor-pointer rounded-sm">
              Login
            </button>
            <Link to={"/signup"}><div className='flex justify-end w-full'>
              <h1 className='text-xs '>New User? <span className='text-blue-900 cursor-pointer'>Signup</span></h1>
            </div></Link>
            {auth.error && <span>{auth.error}</span>}
          </div>
        </div>
      );
}

export default Login
