import React, { useEffect, useState } from 'react';
import { singleuser } from '../../../services/api/adminRoute';
import { useQuery } from '@tanstack/react-query';

const ChatMessages = ({ chatsMembers, currentUser, user, SetUser,sendDataToParent }) => {
    
    const friend = chatsMembers.participants.find((user) => user !== currentUser);
    const { data: singleUser, isLoading } = useQuery({
        queryKey: friend ? ["user", friend] :undefined,
        queryFn: singleuser,
    });

    const sendCuurrentuser = () => {
        return sendDataToParent(singleUser)
    }


    useEffect(() => {
        if (singleUser) {
            sendCuurrentuser()
            SetUser(singleUser);
        }
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!singleUser) {
        return null;
    }

    return (
        <>
            <div className=' h-[5rem]  w-[90%]  flex  gap-3 items-center  mx-auto'>
                <img className='w-16 h-16 object-cover object-top rounded-full' src={singleUser?.profilePicture} alt="" />
                <div className="info flex flex-col">
                    <p className='font-semibold capitalize'> {singleUser.username} </p>
                    <p>10:30</p>
                </div>
            </div>
        </>
    );
};

export default ChatMessages;
