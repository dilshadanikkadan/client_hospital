import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Dashboard'
import DoctorLogin from './DoctorLogin'
import { DoctorProtectLoginRoute } from '../../store/others/DoctorLoginProtectRoute'
import { DoctorProtectRoute } from '../../store/others/doctorProtectRoute'
import SetdatesPage from './SetdatesPage'
import PendingAppointment from './PendingAppointment'
import ViewPendingAppointment from './ViewPendingAppointment'
import ChatWithPatients from './ChatWithPatients'
import VideoChatPage from './VideoChatPage'
import PrescriptionPage from './PrescriptionPage'
import CompletedPatientsPage from './CompletedPatientsPage'
import PatientsAnalysticsPage from './PatientsAnalysticsPage'

const Doctormain = () => {
  const router = createBrowserRouter([
    {
      path: '/doctor',
      element:
      <DoctorProtectRoute>

      <Dashboard />
      </DoctorProtectRoute>
    },
    {
      path: '/doctor/setdates',
      element:
      <SetdatesPage/>

     
    },
    {
      path: '/doctor/prescription',
      element:
      <PrescriptionPage/>

     
    },
    {
      path: '/doctor/patients',
      element:
      <PendingAppointment/>

     
    },
    {
      path: '/doctor/patientHistory',
      element:
      <CompletedPatientsPage/>

     
    },
    {
      path: '/doctor/chat',
      element:
      <ChatWithPatients/>

     
    },
    {
      path: '/doctor/analystics',
      element:
      <PatientsAnalysticsPage/>

     
    },
    {
      path: '/doctor/chat/videoCall',
      element:
      <VideoChatPage/>

     
    },
    {
      path: '/doctor/patients/:id',
      element:
      <ViewPendingAppointment/>

     
    },
    {
      path: '/doctor/login',
      element:
        <DoctorProtectLoginRoute>

          <DoctorLogin />
        </DoctorProtectLoginRoute>
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Doctormain
