import React, { useEffect, useState } from 'react'
import SideBarDocotor from '../../components/doctor/DoctorDashBoard/SideBarDocotor'
import DcotorsViewBar from '../../components/user/chatPage/DcotorsViewBar'
import DoctorsSingleChat from '../../components/user/chatPage/DoctorsSingleChat'
import { getConversation } from '../../services/api/userRoute'
import { currentUser } from '../../services/hooks/CuurentUser'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Navbar from '../../components/user/HomePage/Navbar'
import { singleuser } from '../../services/api/adminRoute'

const ChatWithPatients = () => {
    const { isAuthenticated } = useSelector((state) => state.user)
    const { isDoctor } = useSelector((state) => state.doctor)
    const userId = currentUser()
    const [currentChat, SetCurrentChat] = useState(null)
    const [user, SetUser] = useState(null);
    const [currentUserChat, setCurrentUserChat] = useState({})

    const { data: allConversation } = useQuery({
        queryKey:  ["conversation", userId],
        queryFn: getConversation
    })
    const handleGrandchildData = (data) => {
        setCurrentUserChat(data)
    };
   
    return (
        <>
           {
            isAuthenticated ?
            <Navbar/>
            :""
           }
            
            <div className={`flex w-full  ${isAuthenticated ? "m-auto " :""}`}>
                {
                    isDoctor ?
                    <SideBarDocotor />:""
                }
                <div className={`div w-[80%] ${isAuthenticated ? "m-auto w-[83%] mt-0" :""}  flex mt-10 mr-10`}>
                    <DcotorsViewBar sendDataToParent={handleGrandchildData} user={user} SetUser={SetUser} allConversation={allConversation?.result} SetCurrentChat={SetCurrentChat} />
                    <DoctorsSingleChat currentUserChat={currentUserChat} currentChat={currentChat} SetCurrentChat={SetCurrentChat} user={user} userId={userId} />

                </div>
            </div>
        </>

    )
}

export default ChatWithPatients