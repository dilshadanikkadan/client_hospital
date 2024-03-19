import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import Footer from '../../components/user/HomePage/Footer'
import ViewAppointmentBox from '../../components/user/viewAppointment/ViewAppointmentBox'

const ViewAppointment = () => {
  return (
    <div>
        <Navbar/>
        <ViewAppointmentBox/>
        <Footer/>

    </div>
  )
}

export default ViewAppointment