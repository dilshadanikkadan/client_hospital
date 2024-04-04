import React from 'react'
import Navbar from '../components/admin/SideBar'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from '../pages/admin/Dashboard'
import About from '../pages/patient/About'
import Contact from '../pages/patient/Contact'
import Users from '../pages/admin/Users'
import AdminLogin from '../pages/admin/AdminLogin'
import { AdminProtectRoute } from '../store/others/AdminProtectRoute'
import SingleUser from '../pages/admin/SingleUser'
import DoctorsPending from '../pages/admin/DoctorsPending'
import SinglePendingDoctor from '../pages/admin/SinglePendingDoctor'
import { AdminLoginProtectRoute } from '../store/others/AdminLoginProtectRoute'
import LicensePage from '../pages/admin/LicensePage'
import AnaysticsPage from '../pages/admin/AnaysticsPage'
import BannerPage from '../pages/admin/BannerPage'
import SpecialitiesPage from '../pages/admin/SpecialitiesPage'
import Error from '../components/common/Error'
const router = createBrowserRouter([
  {
    path: '/admin',
    element:
      <AdminProtectRoute>
        <Dashboard />
      </AdminProtectRoute>,
      errorElement: <Error/>
  },
  {
    path: 'admin/users',
    element:
      <AdminProtectRoute>
        <Users />
      </AdminProtectRoute>
  },
  {
    path: 'admin/analystics',
    element:
      <AdminProtectRoute>
        <AnaysticsPage />
      </AdminProtectRoute>
  },
  {
    path: 'admin/banner',
    element:
      <AdminProtectRoute>
        <BannerPage />
      </AdminProtectRoute>
  },
  {
    path: 'admin/specialities',
    element:
      <AdminProtectRoute>
        <SpecialitiesPage />
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
      <RouterProvider key={window.location.pathname} router={router} />
    </div>
  )
}

export default Adminmain
