import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import SetDates from '../../components/doctor/SetDates/SetDates'

const SetdatesPage = () => {
  return (
    <div className=' flex w-full'>

    <SideBarDocotor />
    <div className="div w-[80%] ">
        <SetDates/>
    </div>
  </div>
  )
}

export default SetdatesPage
