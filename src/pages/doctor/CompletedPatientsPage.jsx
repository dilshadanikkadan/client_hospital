import React from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import CompletedPatientsList from '../../components/doctor/patients/CompletedPatientsList'

const CompletedPatientsPage = () => {
    return (
        <div>
            <div className=' flex w-full'>

                <SideBarDocotor />
                <div className="div w-[80%] ">
                    <CompletedPatientsList />
                </div>
            </div>
        </div>
    )
}

export default CompletedPatientsPage