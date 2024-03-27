import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cancelAppointment, singleAppointmentHistory, viewAppointment } from '../../../services/api/userRoute';
import { useMutation, useQuery } from '@tanstack/react-query';

const AppointmentBoxSingle = () => {
    const { id } = useParams()
    const navigate = useNavigate()


    const { data: currentAppintment } = useQuery({
        queryKey: ["appointment", id],
        queryFn: singleAppointmentHistory

    })
    // const currentAppintment = myAppointment?.find((x)=> x.status === "pending")
    console.log(currentAppintment);

    return (
        <div className='w-full flex flex-col justify-center  '>
            <div className='w-[90%] md:w-[60%] m-auto overflow-hidden  mt-10    py-4 px-6 rounded-md shadow-md'>
                <h3 className='font-info font-semibold text-2xl capitalize '> Appointment Details</h3>
                <div className="details">
                    <div className="userinfo flex items-center  gap-3 mt-6">
                        <img className='w-14 h-14 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                        <div className="details">
                            <h3 className='font-semibold font-desc capitalize subpixel-antialiased' >{currentAppintment?.lastname}</h3>
                            <p className='subpixel-antialiased'>{currentAppintment?.email}</p>

                        </div>

                    </div>


                    <div className='appoInfo mt-5 '>

                        <h3 className='text-xl font-semibold'> Appointment Details</h3>
                        <div className="deatils w-full flex  flex-col gap-3 mt-3">
                            <div className="info flex justify-between text-lg">
                                <p className='subpixel-antialiased'>Date</p>
                                <p>{currentAppintment?.date} - {currentAppintment?.month} - 2024</p>
                            </div>
                            <div className="info  flex justify-between text-lg">
                                <p>Time</p>
                                <p>{currentAppintment?.timeSelected}pm</p>
                            </div>
                            <div className="info  flex justify-between text-lg">
                                <p>Status</p>
                                <p className='capitalize'>{currentAppintment?.status}</p>
                            </div>
                            <div className="info  flex justify-between text-lg">
                                <p>Prescription</p>
                                <a href={currentAppintment?.prescription} target='_blank' download className='rounded-md px-4 text-white bg-secondary'>Download</a>
                            </div>
                        </div>
                    </div>

                    <div className="doctorInfo mt-8">
                        <h3 className='text-2xl font-semibold'>Doctor</h3>
                        <div className="userinfo flex items-center  gap-3 mt-3">
                            <img className='w-14 h-14 object-cover rounded-full' src={currentAppintment?.doctor?.profileImage} alt="" />
                            <div className="details">
                                <h3 className='font-semibold font-desc'>{currentAppintment?.doctor?.lastname}</h3>
                                <p>{currentAppintment?.doctor?.email}</p>

                            </div>

                        </div>
                    </div>

                </div>


            </div>
            <div className="div w-[60%] m-auto flex   items-center justify-center gap-10">


            </div>
        </div>
    )
}

export default AppointmentBoxSingle