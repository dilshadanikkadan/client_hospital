import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import ViewdoctorBox from '../../components/user/AllDoctor/ViewdoctorBox'
import Footer from '../../components/user/HomePage/Footer'

const SingleDoctorView = () => {
  return (
    <div>
        <Navbar/>
        <ViewdoctorBox/>
        <Footer/>
    </div>
  )
}

export default SingleDoctorView