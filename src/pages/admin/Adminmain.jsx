import React from 'react'
import Navbar from '../../components/admin/SideBar'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Dashboard'
import About from '../patient/About'
import Contact from '../patient/Contact'
import Users from './Users'
import AdminLogin from './AdminLogin'
import { AdminProtectRoute } from '../../store/others/AdminProtectRoute'
import SingleUser from './SingleUser'
import DoctorsPending from './DoctorsPending'
import SinglePendingDoctor from './SinglePendingDoctor'
import { AdminLoginProtectRoute } from '../../store/others/AdminLoginProtectRoute'
import LicensePage from './LicensePage'
const router = createBrowserRouter([
  {
    path: '/admin',
    element:
      <AdminProtectRoute>

        <Dashboard />
      </AdminProtectRoute>,
    errorElement: <div>404  not found</div>
  },
  {
    path: 'admin/users',
    element:
      <AdminProtectRoute>

        <Users />
      </AdminProtectRoute>
  },
  {
    path: 'admin/pending_doctorRequests',
    element:
      <AdminProtectRoute>

        <DoctorsPending />
      </AdminProtectRoute>
  },
  {
    path: 'admin/pending_doctorRequests/:id',
    element:
      <AdminProtectRoute>

        <SinglePendingDoctor />
      </AdminProtectRoute>
  },
  {
    path: 'admin/users/:id',
    element:
      <AdminProtectRoute>

        <SingleUser />
      </AdminProtectRoute>
  },
  {
    path: 'admin/contact',
    element: <Contact />
  },
  {
    path: 'admin/login',
    element: 
    <AdminLoginProtectRoute>

    <AdminLogin />
    </AdminLoginProtectRoute>
  },
  {
    path: 'admin/license',
    element: 

    <LicensePage />
  }
])

const Adminmain = () => {
  const dilu = "dilu"
  return (
    <div>
      <RouterProvider dilu="heu dilu" router={router} />
    </div>
  )
}

export default Adminmain
