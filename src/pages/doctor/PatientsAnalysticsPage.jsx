import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import PatientGraph from '../../components/doctor/Analystics/PatientGraph'
import AccountSheet from '../../components/doctor/Analystics/AccountSheet'
import PatientProfitGraph from '../../components/doctor/Analystics/PatientProfitGraph'

const PatientsAnalysticsPage = () => {
    return (
        <div className='w-full flex flex-col md:flex-row'>
            <SideBarDocotor />
            <div className="div w-[90%] md:w-[40%]  ">
                <div className=''>
                    <PatientGraph />
                    <PatientProfitGraph />
                </div>
            </div>
            <div className='mx-10'>
                <AccountSheet />
            </div>
        </div>
    )
}

export default PatientsAnalysticsPage