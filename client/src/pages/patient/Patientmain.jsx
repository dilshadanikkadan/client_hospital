import React, { useEffect } from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import { createBrowserRouter, Router, RouterProvider, useLocation } from "react-router-dom"
import Home from './Home'
import About from './About'
import Contact from './Contact'
import VeifyEmail from './VeifyEmail'
import { ProtectedRoute } from '../../store/others/ProtecteRoute'
import SignUp from "./SignUp"
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import ForgotOtpVerify from './ForgotOtpVerify'
import ResetPassword from './ResetPassword'
import Service from './Service'
import ApllicationPartOne from '../doctor/ApllicationPartOne'
import ApplicationpartTwo from '../doctor/ApplicationpartTwo'
import ApplicationPartThree from '../doctor/ApplicationPartThree'
import ApplicationSuccessPage from '../doctor/ApplicationSuccessPage'
import { ApplicationProtectRoute } from '../../store/others/ApplicationProtectRoute'
import PatientProfile from './PatientProfile'
import CheckPage from './CheckPage'
import { AnimatePresence } from "framer-motion"
import { BlockeduserCheck } from '../../store/others/BlockedUserCheck'
import Notification from './Notification'
import SingleNotification from './SingleNotification'
import AppointmentPageOne from './AppointmentPageOne'
import AppointmentPageTwo from './AppointmentPageTwo'
import AppointmentSucessPage from './AppointmentSucessPage'
import ViewAppointment from './ViewAppointment'
import SingleDoctorView from './SingleDoctorView'
import DoctorsPage from './DoctorsPage'
import LoadingPage from '../common/LoadingPage'
const Patientmain = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <BlockeduserCheck>

          <Home />
        </BlockeduserCheck>,
      errorElement: <div>404  not found</div>
    },
    {
      path: '/check',
      element: <LoadingPage />,
    },
    {
      path: '/about',
      element:
        <BlockeduserCheck>
          <About />
        </BlockeduserCheck>
    },
    {
      path: '/Ourdoctors',
      element:
        <BlockeduserCheck>
          <DoctorsPage />
        </BlockeduserCheck>
    },
    {
      path: '/service',
      element:
        <BlockeduserCheck>
          <Service />
        </BlockeduserCheck>
    },
    {
      path: "/signup",
      element:
        <ProtectedRoute>
          <SignUp />
        </ProtectedRoute>
    },

    {
      path: "/about/allDoctors/:id",
      element:
          <SingleDoctorView/>
    },
    {
      path: "/allDoctors/:id",
      element:
          <SingleDoctorView/>
    },
    {
      path: "/makeAppointment",
      element:
          <AppointmentPageOne/>
    },
    {
      path: "/makeAppointment/_2",
      element:
          <AppointmentPageTwo/>
    },
    {
      path: "/makeAppointment/_2/sucess",
      element:
          <AppointmentSucessPage/>
    },
    {
      path: "/viewAppointment",
      element:
          <ViewAppointment/>
    },
    {
      path: "service/application_1",
      element:
        <ApplicationProtectRoute>

          <ApllicationPartOne />
        </ApplicationProtectRoute>

    },
    {
      path: "service/application_1/_2",
      element:
        <ApplicationProtectRoute>
          <ApplicationpartTwo />
        </ApplicationProtectRoute>
    },
    {
      path: "service/application_1/_2/_3",
      element:
        <ApplicationProtectRoute>
          <ApplicationPartThree />
        </ApplicationProtectRoute>
    },
    {
      path: "service/application_1/_2/_3/success",
      element:
        <ApplicationProtectRoute>
          <ApplicationSuccessPage />
        </ApplicationProtectRoute>
    },
    {
      path: "/login",
      element:
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
    },
    {
      path: "/profile",
      element:
       <BlockeduserCheck>
        <ApplicationProtectRoute>
          <PatientProfile />
        </ApplicationProtectRoute>
       </BlockeduserCheck>
    },
    {
      path: "/verifyEmail",
      element:
        <ProtectedRoute>
          <VeifyEmail />
        </ProtectedRoute>
    },
    {
      path: "/forgotPassword",
      element:
        <ProtectedRoute>
          <ForgotPassword />
        </ProtectedRoute>
    },
    {
      path: "/verifyOtp",
      element:
        <ProtectedRoute>
          <ForgotOtpVerify />
        </ProtectedRoute>
    },
    {
      path: "/resetPassword",
      element:
        <ProtectedRoute>
          <ResetPassword />
        </ProtectedRoute>
    },
    {
      path: '/blogs',
      element: <div>coming soon</div>
    },
    {
      path: '/notification',
      element: 
      <BlockeduserCheck>

      <Notification/>
      </BlockeduserCheck>
    },
    {
      path: '/notification/:id',
      element: 
      <BlockeduserCheck>

      <SingleNotification/>
      </BlockeduserCheck>
    },
    {
      path: '/contact',
      element: <div>coming soon</div>
    }
  ])
  return (
    <div>
      <AnimatePresence onExitComplete>

        <RouterProvider key={window.location.pathname} router={router} />
      </AnimatePresence>

    </div>
  )
}

export default Patientmain
