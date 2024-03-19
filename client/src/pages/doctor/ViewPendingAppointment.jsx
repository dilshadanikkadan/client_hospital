import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import SinglePendingDetail from '../../components/doctor/ViewAppointmentSingle/SinglePendingDetail'
const ViewPendingAppointment = () => {
  return (
    <div className=' flex w-full'>

    <SideBarDocotor />
    <div className="div w-[80%] ">
        <SinglePendingDetail/>

    </div>
  </div>
  )
}

export default ViewPendingAppointment