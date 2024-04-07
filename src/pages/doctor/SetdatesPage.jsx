import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import SetDates from '../../components/doctor/SetDates/SetDates'

const SetdatesPage = () => {
  return (
    <div className=' flex w-full'>
      <SideBarDocotor />
      <div className="div w-[80%] border-[1px] border-white md:border-gray-200   rounded-md h-[70vh]  mt-14 md:mt-10 ">
        <SetDates />
      </div>
    </div>
  )
}

export default SetdatesPage
