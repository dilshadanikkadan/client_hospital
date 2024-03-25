import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import SetDates from '../../components/doctor/SetDates/SetDates'

const SetdatesPage = () => {
  return (
    <div className=' flex w-full'>
      <SideBarDocotor />
      <div className="div w-[80%] border-[1px] border-gray-200  rounded-md h-[85%]  mt-14 md:mt-5 ">
        <SetDates />
      </div>
    </div>
  )
}

export default SetdatesPage
