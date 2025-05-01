import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useSelector } from 'react-redux'
import Login from './Login'
import axios from "axios"
const Body = () => {
 const dispatch=useDispatch()
 const navigate=useNavigate()
const userData=useSelector((store)=>store.user)

  const fetchUser=async ()=>{
    if(userData) return;
   
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
      dispatch(addUser(res.data))
      
   
    }catch(error){
     if(error.status===401){
     return navigate('/login')
     }
      console.log(error);
      
    }
    

  }

  useEffect(()=>{
   
       fetchUser()
    
   
  },[])

  return (
    <div>
        
      <NavBar/>
      {/* Any children routes of body will render over here */}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
