import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import ContactForm from '../../components/user/contact/ContactForm'
import Footer from '../../components/user/HomePage/Footer'
import AnimatedPage from '../../services/Animation/AnimatedPage'

const ContactPage = () => {
  return (
    <AnimatedPage>
      <div>
        <Navbar />
        <ContactForm />
        <Footer />
      </div>
    </AnimatedPage>
  )
}

export default ContactPage