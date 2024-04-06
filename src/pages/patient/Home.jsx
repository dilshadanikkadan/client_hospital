import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import IntroPart from '../../components/user/HomePage/IntroPart'
import SecondPart from '../../components/user/HomePage/SecondPart'
import ThirdPart from '../../components/user/HomePage/ThirdPart'
import Card from '../../components/user/HomePage/Card'
import Add from '../../components/user/HomePage/Add'
import NumberCard from '../../components/user/HomePage/NumberCard'
import DoctorList from '../../components/user/HomePage/DoctorList'
import CheckUp from '../../components/user/HomePage/CheckUp'
import Footer from '../../components/user/HomePage/Footer'
import { useLocation } from 'react-router-dom'
import CheckBar from '../../components/user/HomePage/CheckBar'
import AnimatedPage from '../../services/Animation/AnimatedPage'
import DoctorModal from '../../components/user/HomePage/DoctorModal'

const Home = () => {
  const location =useLocation()
  return (
    <AnimatedPage>
    <div className='w-full overflow-hidden bg-primary'>
      <Navbar/>
      <DoctorModal/>
      <IntroPart/>
      <SecondPart/>
      <ThirdPart/>  
      <Card/>
      <Add/>
      <NumberCard/>
      <DoctorList/>
      <CheckUp/>
       <Footer/>
    </div>
    </AnimatedPage>
  )
}

export default Home
