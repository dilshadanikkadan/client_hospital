import React from 'react'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { viewAppointment } from '../../../services/api/userRoute'
import { currentUser } from '../../../services/hooks/CuurentUser'
import { singleuser } from '../../../services/api/adminRoute'

const IntroPart = () => {
    const navigate = useNavigate()
    const userId = currentUser()

    const { data: myAppointment } = useQuery({
        queryKey: ["appointment", userId],
        queryFn: viewAppointment

    })

    const { data: logginedUser } = useQuery({
        queryKey: ["user", userId],
        queryFn: singleuser
    })
    console.log(logginedUser);
    return (
        <>


            <div className="   mx-auto w-full sm:w-full bg-primary ]  overflow-hidden pb-10">
                <div className="introPart w-[83%]  h-full items-center  m-auto flex flex-col-reverse md:flex-row ">
                    <motion.div className='left flex-[1] flex flex-col gap-10'
                        initial={{ y: 650, opacity: 0 }}
                        animate={{ y: 10, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >

                        {logginedUser?.isDoctor ?

                            <h3 className='font-info capitalize text-3xl mt-5 font-bold md:text-4xl lg:text-5xl md:mt-0'>Welcome to the Hospital
                                <br />
                            </h3>
                            :
                            <h3 className='font-logo text-3xl mt-5 font-bold md:text-4xl lg:text-5xl md:mt-0'>Your Health is Our
                                <br />
                                Top Priority</h3>
                        }

                        <div className="info  w-[70%]">

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, rem ad quo voluptates sapiente, nobis dolorum neque saepe quae consectetur at ratione obcaecati. Voluptas asperiores enim animi odit. Corporis, nemo.</p>
                        </div>
                        <div className="wrap w-full flex gap-10">

                            <button className='bg-secondary rounded-md text-white py-3 px-3 md:px-5 md:py-4 '>Watch Video</button>

                            {myAppointment?.status == "pending" ?


                                <button className='bg-secondary rounded-md text-white px-3 py-3' onClick={() => navigate("/viewAppointment")} >View Appointment</button>
                                : myAppointment?.status === "approved" ?

                                    <button className='bg-secondary rounded-md text-white px-3 py-3' onClick={() => navigate("/viewAppointment")} >View Appointment</button>
                                    : logginedUser?.isDoctor ?
                                        <Link className='bg-secondary rounded-md text-white px-3 py-3' to={`/doctor/login`} target='_blank'>Log As Doctor</Link>
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
