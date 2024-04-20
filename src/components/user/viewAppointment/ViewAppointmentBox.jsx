import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cancelAppointment, viewAppointment } from '../../../services/api/userRoute';
import { useMutation, useQuery } from '@tanstack/react-query';

const ViewAppointmentBox = () => {
    const navigate = useNavigate()
    let iduser;
    const jwtToken = localStorage.getItem('persist:root');

    if (JSON.parse(jwtToken).user !== "null") {
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

        const userId = decodedToken.id;
        iduser = userId
    }



    const { mutate: deleteAppointment } = useMutation({
        mutationFn: cancelAppointment,
        onSuccess: (data) => {
            if (data.success) {
                navigate("/", { replace: true })
            }
        }
    })
    const { data: myAppointment } = useQuery({
        queryKey: ["appointment", iduser],
        queryFn: viewAppointment

    })
    // logic of panalty  
    const currentAppintment = myAppointment?.find((x) => x.status === "pending")
    let penalty = false
    console.log("currentAppintment", currentAppintment?._id);
    function formateTime(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes}`;
    }

    const currentTime = formateTime(new Date().getTime());
    const appointmentTime = currentAppintment?.timeSelected;

    if (appointmentTime) {
        const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
        const [appointmentHours, appointmentMinutes] = appointmentTime.split(':').map(Number);

        const currentTotalMinutes = currentHours * 60 + currentMinutes;
        const appointmentTotalMinutes = appointmentHours * 60 + appointmentMinutes;
        const minutesDifference = appointmentTotalMinutes - currentTotalMinutes;

        if (minutesDifference <= 45 && minutesDifference >= 0) {
            console.log("There are 15 minutes or less left until the appointment.");
            penalty = true
        } else {
            penalty = false
            console.log("There are more than 15 minutes left until the appointment.");
        }
    } else {
        console.log("Appointment time is not defined.");
    }

   
 
    const handleCancelAppointment = () => {
        console.log(deleteAppointment);
        document.getElementById('my_modal_5').showModal();

    }
    const cancelAppointmentModal =()=>{
        deleteAppointment({
                appointmentId: currentAppintment?._id,
                timeId: currentAppintment?.time.id,
                doctorListId: currentAppintment?.doctorListId,
                bookedId: currentAppintment?.bookedId,
                timeSelected: currentAppintment?.timeSelected,
                myId: iduser,
                penalty
            })
        }
    console.log("currentTime", penalty);
    return (
        <div className='w-full flex flex-col justify-center  '>
            <div className='w-[95%] md:w-[60%] m-auto overflow-hidden  mt-10    py-4 px-6 rounded-md shadow-md'>
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

                {/* <button className='mt-6 bg-base-300  py-3 px-6 rounded-lg ' onClick={() => navigate("/")}>Return To Home</button> */}
                <button className='mt-6 bg-base-300  py-3 px-6 rounded-lg font-semibold ' onClick={() => navigate("/reshedule_appointment", {
                    state: {

                        ...currentAppintment?.doctor,
                        myAppointmentId: currentAppintment?._id,
                        prevTimeId: currentAppintment?.time.id,
                        prevDoctodId: currentAppintment?.doctorListId,
                        prevBookedId: currentAppintment?.bookedId,
                        prevTimeSelected: currentAppintment?.timeSelected
                    }
                })}>Reshedule</button>
                <button className='mt-6 bg-secondary text-white  py-3 px-6 rounded-lg ' onClick={handleCancelAppointment}>Cancel</button>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-2">are you sure want to Cancel the appointment ?</p>
                    <p className="py-1 text-red-500">
                        Notice: Cancellations before 45 minuts of booked time result in 50% refund only.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn bg-base-300">Cancel</button>
                            <button className="btn bg-secondary text-white ml-3"  onClick={cancelAppointmentModal}>Yes</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ViewAppointmentBox