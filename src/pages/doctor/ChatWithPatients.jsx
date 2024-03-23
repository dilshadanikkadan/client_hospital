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
    const { isAuthenticated ,isDoctorMe} = useSelector((state) => state.user)
    const { isDoctor } = useSelector((state) => state.doctor)
    const [isOpen, setIsOpen] = useState(false)

    const userId = currentUser()
    const [currentChat, SetCurrentChat] = useState(null)
    const [user, SetUser] = useState(null);
    const [currentUserChat, setCurrentUserChat] = useState({});
    const [selectedUser, setSelectedUser] = useState(null)

    const { data: allConversation } = useQuery({
        queryKey: ["conversation", userId],
        queryFn: getConversation
    })
    const handleGrandchildData = (data) => {
        setCurrentUserChat(data)
    };
    console.log(isDoctor);
    return (
        <>
            {
                isAuthenticated ?
                    <Navbar />
                    : ""
            }

            <div className={`flex w-full   ${isAuthenticated ? "m-auto " : ""}`}>
                {
                    isDoctor ?
                        <SideBarDocotor /> : ""
                }
                <div className={`div w-[83%] ${isAuthenticated ? "mx-auto w-[83%] mt-0" : "mt-10 mr-10"}  flex  `}>
                    <DcotorsViewBar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        setSelectedUser={setSelectedUser}
                        currentChat={currentChat} sendDataToParent={handleGrandchildData}
                        user={user} SetUser={SetUser}
                        allConversation={allConversation?.result}
                        SetCurrentChat={SetCurrentChat} />


                    <DoctorsSingleChat
                        isOpen={isOpen}
                        selectedUser={selectedUser}
                        currentUserChat={currentUserChat}
                        currentChat={currentChat}
                        SetCurrentChat={SetCurrentChat}
                        user={user} userId={userId}
                    />

                </div>
            </div>
        </>

    )
}

export default ChatWithPatients