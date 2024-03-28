import React from 'react'
import SideBar from '../../components/admin/SideBar'
import Box from '../../components/admin/DashBoard/Box'
import Updates from '../../components/admin/DashBoard/Updates'

const Dashboard = () => {
  return (
    <div className='flex w-full'>
    <SideBar/>
    <div className='w-[80%]'>
        <DoctorPendingList/>
    </div>
  </div>
  )
}

export default Dashboard
