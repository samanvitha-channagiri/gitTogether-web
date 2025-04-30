import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Body = () => {
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
