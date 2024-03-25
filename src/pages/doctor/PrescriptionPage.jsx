import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import PriscriptionBox from '../../components/doctor/Prescription/PriscriptionBox'

const PrescriptionPage = () => {
    return (
        <div className=' flex w-full'>

            <SideBarDocotor />
            <div className="div w-[75%]  mt-14 border-[1px] border-gray-200  rounded-md h-[95%] py-7">
                <PriscriptionBox/>
            </div>
        </div>
    )
}

export default PrescriptionPage