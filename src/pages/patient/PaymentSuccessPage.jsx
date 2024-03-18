import React from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import Footer from '../../components/user/HomePage/Footer'
import PaymentSucessBox from '../../components/user/Success/PaymentSucessBox'

const PaymentSuccessPage = () => {
    return (

        <div>
            <Navbar />
            <PaymentSucessBox />
            <Footer />
        </div>

    )
}

export default PaymentSuccessPage