import React from 'react'
import {Link, NavLink} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../App'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick=()=>{
    const UPDATED_AUTH_LOGOUT ={
      user:undefined,
      loading : false,
      error : undefined,
  }
    setAuth(UPDATED_AUTH_LOGOUT);
    // navigate("/login");
  }
  
  return (
    <div className='navbar h-[50px] bg-[#003580] flex justify-center'>
        <div className="navContainer w-full max-w-[1024px] text-white flex items-center justify-between">
            <NavLink to={"/"}>
            <span className="logo font-bold text-2xl">Booking</span>
            </NavLink>
            {auth.user ?<>
            <div className='flex items-center justify-center gap-2 '>
              <button className='border-2 px-3 py-1 rounded-xl' onClick={handleClick}>Logout</button>
              <FaUserCircle className='text-3xl'/>
              <h1 className='text-xl font-bold'>{auth.user.username}</h1>
              </div></>:<div className="navItems">
                <Link to={"/signup"}><button className="navButton  px-2 py-[5px] cursor-pointer text-[#003580] bg-white rounded-md" >Register</button></Link>
                <Link to={"/login"}><button className="navButton bg-white px-4 py-[5px] ml-6 px-1cursor-pointer text-[#003580] rounded-md">Login</button></Link>
            </div>}
        </div>
      
    </div>
  )
}

export default Navbar
