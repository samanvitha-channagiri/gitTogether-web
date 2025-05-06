import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Requests = () => {
    const requests=useSelector((store)=>store.requests)
    const dispatch=useDispatch()
    // const [showButtons,setShowButtons]=useState(true)

    const reviewRequest=async(status,_id)=>{
      try{
        const res=axios.post(BASE_URL+'/request/review/'+status+'/'+_id,{},{withCredentials:true}) //in post call second parameter is the data, If you don't want to pass anything, send empty object**

        dispatch(removeRequest(requests._id))
      }catch(error){
        console.log(error.message);
        

      }
    }

    const fetchRequests=async()=>{
        try{
        const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});

        dispatch(addRequests(res.data.data))
        }catch(error){
            console.log(error.message);
            

        }
    }
    
    
    console.log("requests"+requests);
    useEffect(()=>{
         fetchRequests()
    },[])
    console.log("requests"+requests);
    
    
    if(requests.length===0) return <h1 className='flex justify-center my-10'>No requests found</h1>
  return (
    <div className=' text-center my-10'>
      <h1 className='text-bold text-3xl text-white'>Requests</h1>
      {requests.map((request)=>{
        console.log(request);
        
        const {_id,firstName,lastName,photoUrl,age,gender,about}=request.fromUserId
       return (<div key={_id}  className=" justify-between items-center m-4 p-4  rounded-lg bg-base-300 flex w-2/3 mx-auto">
        <div> 
             <img className='w-20 h-20 rounded-full object-cover  ' src={photoUrl} alt="photo" />
        </div>
        <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName+" "+lastName}</h2>
       
        {age&&gender&& <p>{age+" "+gender}</p>}
         <p>{about}</p>
        </div>
        <div>
        <button onClick={()=>reviewRequest("rejected",request._id)} className="btn btn-primary mx-2">Reject</button>
        <button onClick={()=>reviewRequest("accepted",request._id)}  className="btn btn-secondary mx-2">Accept</button>
        </div>
        
       

        </div>)
      })}
    </div>
  )
}

export default Requests
