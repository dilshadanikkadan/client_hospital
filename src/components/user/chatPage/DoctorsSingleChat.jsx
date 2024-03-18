import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useId, useRef, useState } from 'react'
import { getAllMessage, sendMessage } from '../../../services/api/userRoute';
import { singleuser } from '../../../services/api/adminRoute';
import { currentUser } from '../../../services/hooks/CuurentUser';
import { SocketContext } from '../../../store/redux/slices/SocketContext';

const DoctorsSingleChat = ({ currentChat, SetCurrentChat, user, userId, currentUserChat }) => {
    const { sendDataToServer, socket } = useContext(SocketContext);
    const [typing, setTyping] = useState(false)
    const [arrivedMsg,setarrivedMsg] =useState(null)
    const messageRef = useRef()
    const [messages, setMessages] = useState([]);
    const [messageValue, setMessageValue] = useState("")
    const queryClient = useQueryClient()
    const { data: allMsg, refetch } = useQuery({
        queryKey: currentChat?._id ? ["allMessages", currentChat?._id] : undefined,
        queryFn: getAllMessage

    });

    const { mutate: sendMessageMutate } = useMutation({
        mutationFn: sendMessage,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries(["allMessages"])
            }
        }
    })

    useEffect(() => {
        if (allMsg) {
            messageRef.current?.scrollIntoView({ behavior: "smooth" })
            setMessages(allMsg)
        }
    }, [allMsg])
    const friend = messages[0]?.chatRoom.participants.find((user) => user !== userId)
    const { data: singleUser, isLoading } = useQuery({
        queryKey: friend ? ["user", friend] : undefined,
        queryFn: singleuser,
    });

    console.log(currentChat);
    const handleMessageSend = () => {
        socket.emit("sendMessage", {
            recieverId: friend,
           
        })
        sendMessageMutate({
            sender: userId,
            chatRoom: currentChat?._id,
            text: messageValue
        })
        setMessageValue("")
    }

    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (data) => {
                // console.log("message has been reched " + data);
                queryClient.invalidateQueries(["allMessages"])
                setTyping(false)
            })
            socket.on("getTyping", ({text}) => {
                console.log("notification reachged");
                text.length > 0 ?
                setTyping(true)
                :setTyping(false)
            })

        }
    }, [socket,queryClient])

   
    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, queryClient])




    return (
        currentChat ?
            <div className='w-full h-[82vh] border-[1px] border-gray-200 mt-3  rounded-md ml-2'>
                <div className="div h-[5rem] border-b-[1px] border-gray-200 flex items-center">
                    <div className="userview ml-5 flex items-center gap-8">
                        <img className='w-16 h-16 object-cover object-top rounded-full'
                            src={singleUser?.profilePicture}
                            alt="" />
                        <div className="info flex flex-col">
                            <p className='font-semibold capitalize'>{singleUser?.username} </p>
                            <p>10:30</p>
                        </div>
                    </div>


                </div>
                <div className="chatpreview w-[90%] mx-auto mt-3  h-[67%]   overflow-y-auto">
                    {
                        messages?.map((msg, i) => (
                            <div key={i} ref={messageRef} className={`chat  ${msg?.sender === userId ? "chat-end" : "chat-start"} `}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS chat bubble component" src="https://naziya-hospital.netlify.app/assets/img/doctors/doctor-2.png" />
                                    </div>
                                </div>

                                {msg && <div className={`chat-bubble  ${msg?.sender === userId ? "bg-secondary" : "bg-blue-500"} `}>{msg?.text}</div>}

                                <div className="chat-footer opacity-50">
                                    Delivered
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-[90%] mx-auto  '>
                    {
                        typing &&

                        <p className='mb-1 text-secondary font-semibold'>Typing...</p>
                    }
                    <label className="input input-bordered flex items-center gap-2">
                        <input value={messageValue} onChange={(e) => {
                            setMessageValue(e.target.value)
                            socket.emit("typing", { data: "typing", recieverId: friend ,text:e.target.value })
                        }
                        } type="text" className="grow" placeholder="message here" />
                        <button className='rounded-lg py-1 px-4 bg-secondary text-white'
                            onClick={handleMessageSend}
                        > Send</button>
                    </label>
                </div>

            </div>
            :
            <div className='w-full h-[82vh] border-[1px] border-gray-200 mt-3  flex items-center justify-center rounded-md ml-2'>
                <span className='text-3xl text-[rgba(0,0,0,0.39)] capitalize font-semibold'>Open A chat to conversiate </span>

            </div>
    )
}

export default DoctorsSingleChat