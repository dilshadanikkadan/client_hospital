import React, { useState } from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import ProfileBox from '../../components/user/ProfilePgae/ProfileBox'
import OverViewBoxProfile from '../../components/user/ProfilePgae/OverViewBoxProfile'
import { useQuery } from '@tanstack/react-query'
import { singleuser } from '../../services/api/adminRoute'

const PatientProfile = () => {
    let iduser;
    const jwtToken = localStorage.getItem('persist:root');

    if (jwtToken) {
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

        const userId = decodedToken.id;
        iduser = userId
    } else {
        console.error("JWT token not found in local storage.");
    }

    const { data: singleUser } = useQuery({
        queryKey: ["user", iduser],
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
