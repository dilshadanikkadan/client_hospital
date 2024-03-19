import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Dashboard'
import DoctorLogin from './DoctorLogin'
import { DoctorProtectLoginRoute } from '../../store/others/DoctorLoginProtectRoute'
import { DoctorProtectRoute } from '../../store/others/doctorProtectRoute'
import SetdatesPage from './SetdatesPage'
import PendingAppointment from './PendingAppointment'
import ViewPendingAppointment from './ViewPendingAppointment'

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
      path: '/doctor/patients',
      element:
      <PendingAppointment/>

     
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
