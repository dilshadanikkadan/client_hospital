import React from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { viewAppointment } from '../../../services/api/userRoute'

const IntroPart = () => {
    const navigate = useNavigate()
    let iduser;
    const jwtToken = localStorage.getItem('persist:root');

    if (JSON.parse(jwtToken).user !== "null") {
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

        const userId = decodedToken.id;
        iduser = userId
    }

    const { data: myAppointment } = useQuery({
        queryKey: ["appointment", iduser],
        queryFn: viewAppointment

    })
    console.log(myAppointment);
    return (
        <>


            <div className="   mx-auto w-full sm:w-full bg-primary ]  overflow-hidden pb-10">
                <div className="introPart w-[83%]  h-full items-center  m-auto flex flex-col-reverse md:flex-row ">
                    <motion.div className='left flex-[1] flex flex-col gap-10'
                        initial={{ y: 650, opacity: 0 }}
                        animate={{ y: 10, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className='font-logo text-3xl mt-5 font-bold md:text-4xl lg:text-5xl md:mt-0'>Your Health is Our
                            <br />
                            Top Priority</h3>
                        <div className="info  w-[70%]">

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, rem ad quo voluptates sapiente, nobis dolorum neque saepe quae consectetur at ratione obcaecati. Voluptas asperiores enim animi odit. Corporis, nemo.</p>
                        </div>
                        <div className="wrap w-full flex gap-10">

                            <button className='bg-secondary rounded-md text-white py-3 px-3 md:px-5 md:py-4 '>Watch Video</button>

                            {myAppointment?.status == "pending" ?


                                <button className='bg-secondary rounded-md text-white px-3 py-3' onClick={() => navigate("/viewAppointment")} >View Appointment</button>
                                :  myAppointment?.status === "approved" ?

                                <button className='bg-secondary rounded-md text-white px-3 py-3' onClick={() => navigate("/viewAppointment")} >View Appointment</button>
                                :
                            <button className='bg-secondary rounded-md text-white px-3 py-3' onClick={() => navigate("/makeAppointment")}>Make an Appointment</button>

                            }
                        </div>
                    </motion.div>


                    <motion.div className='right flex-[1]'
                        initial={{ y: 650 }}
                        animate={{ y: 10 }}
                        transition={{ delay: 0.4, type: 'ease' }}
                    >
                        <div className="doctor">
                            <img src="https://naziya-hospital.netlify.app/assets/img/hero/doctor.png" alt="" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    )
}

export default IntroPart
