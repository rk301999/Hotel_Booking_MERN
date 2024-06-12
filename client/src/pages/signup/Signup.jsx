import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "https://hotel-booking-mern-qvza.onrender.com/api/";
const Signup = () => {

    const [credentials,setCredentials] = useState({
        username : undefined,
        password : undefined,
        email : undefined,
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
        try {
            const res = await axios.post("/auth/register",credentials)
            // console.log(res);
            alert("User Registered Successfully")
            console.log("user hai ye",auth);
            navigate("/login")
        } catch (error) {
            alert(error.message);
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
              type="text"
              placeholder="email"
              id="email"
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
              Signup
            </button>
            <Link to={"/login"}><div className='flex justify-end w-full'>
              <h1 className='text-xs '>Already Signed up ? <span className='text-blue-900 cursor-pointer'>Login</span></h1>
            </div></Link>
            {auth.error && <span>{auth.error}</span>}
          </div>
        </div>
      );
}

export default Signup
