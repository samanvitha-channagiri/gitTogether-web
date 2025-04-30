import React, { useState } from 'react'
import axios from 'axios'
import {useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
const Login = () => {
const [emailId,setEmailId]=useState("akshay@gmail.com");
const [password,setPassword]=useState("Akshay@123");
const dispatch=useDispatch()
const navigate=useNavigate();
const [error,setError]=useState("")
const handleLogin=async ()=>{
  
 try{
  
  const res=await axios.post(BASE_URL+"/login",{
    emailId,password
  },{withCredentials:true});
  
  dispatch(addUser(res.data)) //added data into the store
  navigate('/')
 }catch(error){
  setError(error?.response?.data||"Something sent wrong");
  
  
 }

}

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Login!</h2>
    <div >
    <label className="form-control w-full max-w-xs my-4">
  <div className="label">
    <span className="label-text">Email ID</span>
   
  </div>
  <input type="text" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />

</label>
<label className="form-control w-full max-w-xs my-4">
  <div className="label">
    <span className="label-text">Password</span>
   
  </div>
  <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />

</label>
    </div>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
