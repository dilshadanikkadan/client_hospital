import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import PatientGraph from '../../components/doctor/Analystics/PatientGraph'
import AccountSheet from '../../components/doctor/Analystics/AccountSheet'
import PatientProfitGraph from '../../components/doctor/Analystics/PatientProfitGraph'

const PatientsAnalysticsPage = () => {
    return (
        <div className='w-full flex'>
            <SideBarDocotor />
            <div className="div w-[40%] ">
                <div>
                    <PatientGraph />
                    <PatientProfitGraph/>
                </div>
            </div>
                <AccountSheet/>
        </div>
    )
}

export default PatientsAnalysticsPage