import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import PatientsListPending from '../../components/doctor/patients/PatientsListPending'

const PendingAppointment = () => {
  return (
    <div className=' flex w-full'>

      <SideBarDocotor />
      <div className="div w-[100%] md:w-[80%] ">
        <PatientsListPending />
      </div>
    </div>
  )
}

export default PendingAppointment