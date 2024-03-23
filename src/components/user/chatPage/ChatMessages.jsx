import React, { useEffect, useState } from 'react';
import { singleuser } from '../../../services/api/adminRoute';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format, render } from 'timeago.js';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { readMessage } from '../../../services/api/userRoute';

function formateTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${period}`;
}

const ChatMessages = ({ chatsMembers, messageLast,userId, time, lastMessage, SetCurrentChat, currentUser, user, SetUser, sendDataToParent }) => {
    const friend = chatsMembers.participants.find((user) => user !== currentUser);
    const { data: singleUser, isLoading } = useQuery({
        queryKey: friend ? ["user", friend] : undefined,
        queryFn: singleuser,
    });

    const sendCuurrentuser = () => {
        return sendDataToParent(singleUser)
    }

    useEffect(() => {

        console.log(singleUser);
        SetUser(singleUser);
        sendCuurrentuser()

    }, [chatsMembers, SetCurrentChat]);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!singleUser) {
        return null;
    }

    return (
        <>
            <div className=' h-[5rem]  w-[90%]  flex  gap-3 items-center  mx-auto'>
                <img className='w-12 h-12 object-cover object-top rounded-full' src={singleUser?.profilePicture} alt="" />
                <div className="info flex flex-col w-full">
                    <p className='font-semibold capitalize'> {singleUser.username} </p>
                    <div className='flex  justify-between w-full  '>
                        <p className='font-semibold subpixel-antialiased line-clamp-1 text-sm  w-[80px] h-7'>{lastMessage[lastMessage.length - 1]?.text || messageLast?.text}</p>

                        {userId !== lastMessage[lastMessage.length - 1]?.sender ?

                            <div className='relative top-[-18px]'>

                                <p className='text-sm'>{formateTime(lastMessage[lastMessage.length - 1]?.time || messageLast?.time) }</p>
                                {
                                    lastMessage.length > 0 &&
                                    <div className="badge bg-secondary text-white badge-sm absolut">

                                        {lastMessage.length}
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <DoneAllIcon />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatMessages;
