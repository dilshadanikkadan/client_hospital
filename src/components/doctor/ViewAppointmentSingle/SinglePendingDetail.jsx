import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { viewAppointment } from '../../../services/api/userRoute'
import { useParams } from 'react-router-dom'
import { approveAppointment } from '../../../services/api/doctorRoute'

const SinglePendingDetail = () => {
    const queryClient = useQueryClient()
    const { id } = useParams()

    const { data: appointment } = useQuery({
        queryKey: ["appointment", id],
        queryFn: viewAppointment

    })

    const { mutate: approveAppointmentMutate } = useMutation({
        mutationFn: approveAppointment,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries(["appointment"])
                console.log("sucess fully updatede");
            }
        }
    })
   let singleAppointment = appointment?.find((x)=> x.status  === "completed" || "pending")
    const handleapproval = () => {
        approveAppointmentMutate(singleAppointment?._id)
    }
    return (
        <div className=' m-auto  mt-14'>
            <h3 className='font-info font-semibold text-2xl capitalize ml-[15%]'> Appointment Details</h3>
            <div className='w-[70%] m-auto pb-10 flex flex-col justify-center mt-5 border-[1px] border-gray-200 shadow-md'>
                <div className='w-[80%] m-auto  mt-10 '>
                    <div className="details">
                        <div className="userinfo flex items-center  gap-3 mt-6">
                            <img className='w-14 h-14 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                            <div className="details">
                                <h3 className='font-semibold font-desc'>{singleAppointment?.lastname}</h3>
                                <p>{singleAppointment?.email}</p>

                            </div>

                        </div>


                        <div className='appoInfo mt-5 '>

                            <h3 className='text-xl font-semibold'> singleAppointment Details</h3>
                            <div className="deatils w-full flex  flex-col gap-3 mt-3">
                                <div className="info flex justify-between text-lg">
                                    <p>Date</p>
                                    <p>{singleAppointment?.date} - {singleAppointment?.month} - 2024</p>
                                </div>
                                <div className="info  flex justify-between text-lg">
                                    <p>Time</p>
                                    <p>{singleAppointment?.timeSelected}</p>
                                </div>
                                <div className="info  flex justify-between text-lg">
                                    <p>Status</p>
                                    <p className='capitalize'>{singleAppointment?.status}</p>
                                </div>
                                <div className="info  flex justify-between text-lg">
                                    <p>reason</p>
                                    <p className='capitalize'>{singleAppointment?.reason}</p>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
                <div className="div w-[60%] m-auto flex   items-center justify-center gap-10">

                    <button className='mt-6 bg-base-300  py-2 px-6 rounded-lg ' >Cancel</button>
                    {
                        appointment?.status === "completed" ?
                        <button className='mt-6 bg-secondary text-white  py-2 px-6 rounded-lg '  >completed</button>
                        :
                        <button className='mt-6 bg-secondary text-white  py-2 px-6 rounded-lg ' onClick={handleapproval} >update</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default SinglePendingDetail