import React, { useState } from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import ProfileBox from '../../components/user/ProfilePgae/ProfileBox'
import OverViewBoxProfile from '../../components/user/ProfilePgae/OverViewBoxProfile'
import { useQuery } from '@tanstack/react-query'
import { singleuser } from '../../services/api/adminRoute'
import { currentUser } from '../../services/hooks/CuurentUser'

const PatientProfile = () => {
    let userId = currentUser()
    const { data: singleUser } = useQuery({
        queryKey: ["user", userId],
        queryFn: singleuser
    })
    return (
        <div>
            <Navbar />
            <div className="div flex  flex-col md:flex-row m-auto w-[83%] gap-10">

                <ProfileBox user={singleUser} />
                <OverViewBoxProfile />
            </div>
        </div>
    )
}

export default PatientProfile
