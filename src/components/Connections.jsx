import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections=useSelector((store)=>store.connections)
    const dispatch=useDispatch()
    const fetchConnections=async()=>{
   try{
    console.log("fetching connections");
    
    const res=await axios.get(BASE_URL+'/user/connections',{withCredentials:true});
    dispatch(addConnections(res.data.data))
      console.log(res.data.data);
   }catch(error){
  
    console.log(error.message);
    
   }
  
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections) return;
    if(connections.length===0) return <h1>No connections found</h1>
  return (
    <div className=' text-center my-10'>
      <h1 className='text-bold text-3xl text-white'>Connections</h1>
      {connections.map((connection)=>{
        const {firstName,lastName,photoUrl,age,gender,about}=connection
       return (<div className=" m-4 p-4  rounded-lg bg-base-300 flex w-1/2 mx-auto">
        <div> 
             <img className='w-20 h-20 rounded-full ' src={photoUrl} alt="photo" />
        </div>
        <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName+" "+lastName}</h2>
       
        {age&&gender&& <p>{age+" "+gender}</p>}
         <p>{about}</p>
        </div>
        
       

        </div>)
      })}
    </div>
  )
}

export default Connections
