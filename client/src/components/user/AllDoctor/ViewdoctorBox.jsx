import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { viewDoctorSingle } from '../../../services/api/userRoute'
import { useNavigate, useParams } from 'react-router-dom'

const ViewdoctorBox = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const {data:doctor}=useQuery({
        queryKey:["doctos",id],
        queryFn:viewDoctorSingle
    })
    return (
        <div className='w-[80%] m-auto'>
            <div className="doctorInfo mt-10 flex justify-between items-center">
                <div className="div flex gap-10 items-center">

                    <img className='w-28 h-28 rounded-full object-cover' src={doctor?.profileImage} alt="" />

                    <div className="div">
                        <p className='font-semibold text-xl'>{doctor?.firstname} {doctor?.lastname}</p>
                        <p>{doctor?.speciality}</p>
                    </div>

                </div>
                <div className="ingo">
                    <button className='py-2 rounded-lg px-5 bg-secondary text-white' onClick={()=> navigate("/makeAppointment")}>Make An Appointment</button>
                </div>
            </div>


            <div className="cardWrapper mt-10 flex gap-8">
                <div className="card w-1/3 border-[1px] border-gray-300 h-[15vh] flex items-center justify-center">
                    <p className='text-xl font-semibold capitalize'>4.9 <span>rating</span></p>
                </div>
                <div className="card w-1/3 border-[1px] border-gray-300 h-[15vh] flex items-center justify-center">
                    <p className='text-xl font-semibold capitalize'>4.9 <span>rating</span></p>
                </div>
                <div className="card w-1/3 border-[1px] border-gray-300 h-[15vh] flex items-center justify-center">
                    <p className='text-xl font-semibold capitalize'>4.9 <span>rating</span></p>
                </div>
            </div>

            <div className="details mt-10 flex flex-col gap-4">
                {/* <h3 className='text-2xl font-semibold  mb-5'>Details</h3> */}

                <div className="div flex flex-col gap-2">
                    <p className='font-semibold text-xl'>Speciality</p>
                    <p className='text-gray-400'>{doctor?.speciality}</p>
                </div>

                <div className="div flex flex-col gap-2">
                    <p className='font-semibold text-xl'>Email</p>
                    <p className='text-gray-400'>{doctor?.email}</p>
                </div>
            </div>
            <div className="patientreviews mt-10">
                <h3 className='text-2xl capitalize font-semibold'>Patient Reviews</h3>

                <div className="div  mt-10  mb-10 flex flex-col gap-1">
                    <p className='capitalize font-serif  font-semibold'>dilshad</p>
                    <p className='text-gray-400 '>mar - 05</p>
                    <div className="rating">
                        <input type="radio" name="rating-1" className="mask mask-star" />
                        <input type="radio" name="rating-1" className="mask mask-star" checked />
                        <input type="radio" name="rating-1" className="mask mask-star" />
                        <input type="radio" name="rating-1" className="mask mask-star" />
                        <input type="radio" name="rating-1" className="mask mask-star" />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis doloribus, explicabo recusandae fugit, non eum placeat vero quasi temporibus incidunt dolor dolorem dolore ea dignissimos doloremque velit cumque adipisci dolores.</p>
                </div>
            </div>
        </div>
    )
}

export default ViewdoctorBox