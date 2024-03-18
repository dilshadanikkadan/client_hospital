import React, { useEffect } from 'react'
import SideBar from '../../components/admin/SideBar'
import Navbar from '../../components/user/HomePage/Navbar'
import Banner from '../../components/user/AboutPage/Banner'
import CheckUp from '../../components/user/HomePage/CheckUp'
import Boxes from '../../components/user/AboutPage/Boxes'
import TreatMentBanner from '../../components/user/AboutPage/TreatMentBanner'
import NumberCard from '../../components/user/HomePage/NumberCard'
import DoctorList from '../../components/user/HomePage/DoctorList'
import Footer from '../../components/user/HomePage/Footer'
import AnimatedPage from '../../services/Animation/AnimatedPage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { singleuser } from '../../services/api/adminRoute'
import { userLogout } from '../../services/api/userRoute'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/redux/slices/userSlice'

const About = () => {




  return (
    <AnimatedPage>

      <div className='overflow-hidden'>
        <Navbar />
        <Banner />
        <CheckUp />
        <Boxes />
        <TreatMentBanner />
        <NumberCard />
        <DoctorList />
        <Footer />
      </div>
    </AnimatedPage>
  )
}

export default About
