import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {

  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleLogout=async ()=>{
   try{
    await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
   //when you log out, clear the redux store and redirect to login page 
   dispatch(removeUser())
   return navigate('/login')
  
    

   }catch(error){
    console.log(error);
    
          
   }
  }
  
  return (
    <div className="navbar bg-base-200">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">👩‍💻gitTogether</Link>
  </div>
 {user&& (<div className="flex-none gap-2">
    <div className="form-control">
      Welcome, {user.firstName}
     
    </div>
    <div className="dropdown dropdown-end mx-5 flex">
      
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default NavBar
