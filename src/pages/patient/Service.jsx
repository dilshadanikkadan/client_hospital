import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import CardsService from '../../components/user/ServicePage/CardsService'
import Footer from '../../components/user/HomePage/Footer'
import ServiceApllicationButton from '../../components/user/ServicePage/ServiceApllicationButton'
import ServiceBreadCrumps from '../../components/user/ServicePage/ServiceBreadCrumps'
import AnimatedPage from '../../services/Animation/AnimatedPage'

const Service = () => {
  return (
    <AnimatedPage>
      <Navbar/>
      <ServiceBreadCrumps/>
      <CardsService/>
      <ServiceApllicationButton/>
      <Footer/>
    </AnimatedPage>
  )
}

export default Service
