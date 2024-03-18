import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import DcotorsViewBar from '../../components/user/chatPage/DcotorsViewBar'
import DoctorsSingleChat from '../../components/user/chatPage/DoctorsSingleChat'

const ChatPatientPage = () => {
  return (
    <div>
        <Navbar/>
        <div className='w-[83%] m-auto flex'>
            <DcotorsViewBar/>
            <DoctorsSingleChat/>

        </div>
    </div>
  )
}

export default ChatPatientPage