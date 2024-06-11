// import Home from './pages/home/Home.jsx'
import './App.css'
import { Outlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'

const SearchContext = createContext();
const AuthContext = createContext();

function App() {

  const INITIAL_STATE_SEARCH = {
    city:undefined,
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    }
  }

  // let user = JSON.parse(localStorage.getItem("user"))
  const INITIAL_STATE_AUTH = {
    user : localStorage.getItem("user") === "undefined" ? undefined : JSON.parse(localStorage.getItem("user")),
    // user : JSON.parse(localStorage.getItem("user")),
    loading : false,
    error : undefined,
  }

  const [stateContext,setStateContext]=useState(INITIAL_STATE_SEARCH);
  const [auth,setAuth]=useState(INITIAL_STATE_AUTH);

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(auth.user))
  },[auth.user])
  
  return (
    <>
    <AuthContext.Provider value={{auth,setAuth}}>
    <SearchContext.Provider value={{stateContext,setStateContext}}>
      <Outlet/>
    </SearchContext.Provider>
    </AuthContext.Provider>
    </>
  )
}

export default App;
export {SearchContext,AuthContext};