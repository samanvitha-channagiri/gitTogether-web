import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import axios from 'axios'
const Feed = () => {
  const feed=useSelector((store)=>store.feed)

  const dispatch=useDispatch()
 
const getFeed=async()=>{
  if(feed) return;

  try{
    const res=await axios.get(BASE_URL+'/feed',{withCredentials:true})
   dispatch(addFeed(res?.data?.data))
  }catch(error){
    console.log("error in get feed");
    
    console.log(error.message);
    

  }
}
useEffect(()=>{
  getFeed();

},[])
if(!feed)return;//why is this statement required,without this its breaking even when the feed exists
if(feed.length<=0){
  return <h1 className='flex justify-center my-10'>No new users found!</h1>

}

  return (
  feed&&( <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed
