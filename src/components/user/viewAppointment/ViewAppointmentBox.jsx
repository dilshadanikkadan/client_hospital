import React from 'react'
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
    console.log(myAppointment?._id);
    const handleCancelAppointment = () => {
         console.log(deleteAppointment);
        deleteAppointment({
            appointmentId: myAppointment?._id,
            timeId: myAppointment?.time.id,
            doctorListId: myAppointment?.doctorListId,
            bookedId: myAppointment?.bookedId
        })
      
    }
    return (
        <div className='w-full flex flex-col justify-center'>
            <div className='w-[60%] m-auto  mt-10 '>
                <h3 className='font-info font-semibold text-2xl capitalize'> Appointment Details</h3>
                <div className="details">
                    <div className="userinfo flex items-center  gap-3 mt-6">
                        <img className='w-14 h-14 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                        <div className="details">
                            <h3 className='font-semibold font-desc'>{myAppointment?.lastname}</h3>
                            <p>{myAppointment?.email}</p>

                        </div>

                    </div>


                    <div className='appoInfo mt-5 '>

                        <h3 className='text-xl font-semibold'> Appointment Details</h3>
                        <div className="deatils w-full flex  flex-col gap-3 mt-3">
                            <div className="info flex justify-between text-lg">
                                <p>Date</p>
                                <p>{myAppointment?.date} - {myAppointment?.month} - 2024</p>
                            </div>
                            <div className="info  flex justify-between text-lg">
                                <p>Time</p>
                                <p>{myAppointment?.time.from}pm to  {myAppointment?.time.to}pm</p>
                            </div>
                            <div className="info  flex justify-between text-lg">
                                <p>Status</p>
                                <p className='capitalize'>{myAppointment?.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="doctorInfo mt-8">
                        <h3 className='text-2xl font-semibold'>Doctor</h3>
                        <div className="userinfo flex items-center  gap-3 mt-3">
                            <img className='w-14 h-14 object-cover rounded-full' src={myAppointment?.doctor?.profileImage} alt="" />
                            <div className="details">
                                <h3 className='font-semibold font-desc'>{myAppointment?.doctor?.lastname}</h3>
                                <p>{myAppointment?.doctor?.email}</p>

                            </div>

                        </div>
                    </div>

                </div>


            </div>
            <div className="div w-[60%] m-auto flex   items-center justify-center gap-10">

                <button className='mt-6 bg-base-300  py-3 px-6 rounded-lg ' onClick={() => navigate("/")}>Return To Home</button>
                <button className='mt-6 bg-base-300  py-3 px-6 rounded-lg ' onClick={() => navigate("/reshedule_appointment",{state:{
                    
                    ...myAppointment?.doctor,
                    myAppointmentId:myAppointment?._id,
                    prevTimeId: myAppointment?.time.id,
                    prevDoctodId: myAppointment?.doctorListId,
                    prevBookedId: myAppointment?.bookedId
                    }})}>Reshedule</button>
                <button className='mt-6 bg-secondary text-white  py-3 px-6 rounded-lg ' onClick={handleCancelAppointment}>Cancel The Apoointment</button>
            </div>
        </div>
    )
}

export default ViewAppointmentBox