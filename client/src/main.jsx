import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import Hotel from './pages/hotel/Hotel.jsx'
import Home from './pages/home/Home.jsx'
import List from './pages/list/List.jsx'
import Login from './pages/login/Login.jsx'
import "./index.css"
import Signup from './pages/signup/Signup.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/hotels",
        element:<List/>
      },
      {
        path:"/hotels/:id",
        element:<Hotel/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
