import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import DashBoardBoxDoctor from '../../components/doctor/DoctorDashBoard/DashBoardBoxDoctor'
import TodaysAppointment from '../../components/doctor/DoctorDashBoard/TodaysAppointment'

const Dashboard = () => {
  return (
    <div className=' flex w-full'>

      <SideBarDocotor />
      <div className="div w-[80%]  rounded-md h-[85%] mt-10 pb-4">
        <DashBoardBoxDoctor />
        <TodaysAppointment />
      </div>
    </div>
  )
}

export default Dashboard
