import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import PriscriptionBox from '../../components/doctor/Prescription/PriscriptionBox'

const PrescriptionPage = () => {
    return (
        <div className=' flex w-full'>

            <SideBarDocotor />
            <div className="div w-[80%] mt-10">
                <PriscriptionBox/>
            </div>
        </div>
    )
}

export default PrescriptionPage