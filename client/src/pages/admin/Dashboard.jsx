import React from 'react'
import SideBar from '../../components/admin/SideBar'
import Box from '../../components/admin/DashBoard/Box'
import Updates from '../../components/admin/DashBoard/Updates'

const Dashboard = () => {
  return (
    <div className='flex w-full'>
      <SideBar />
      <div className="div w-[80%] ">
        <Box />
        <Updates />
      </div>

        {/* <Box /> */}

    </div>
  )
}

export default Dashboard
