import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import { useNavigate } from 'react-router-dom'

const ApplicationSuccessPage = () => {
    const navigate=useNavigate()
  return (
    <div className='w-full'>
      <Navbar/>
      <div className="info w-[50%] m-auto mt-10 flex flex-col items-center gap-10">

      <p className='text-center text-2xl'>Thanks For Your sumbission You will get an Email Once it Approved</p>
       <button onClick={()=> navigate("/" ,{replace:true})} className='py-3  px-6 rounded-lg text-black bg-base-200 m-auto'>Return to Home</button>
      </div>
    </div>
  )
}

export default ApplicationSuccessPage
