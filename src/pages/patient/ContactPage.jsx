import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import ContactForm from '../../components/user/contact/ContactForm'
import Footer from '../../components/user/HomePage/Footer'

const ContactPage = () => {
  return (
    <div>
        <Navbar/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default ContactPage