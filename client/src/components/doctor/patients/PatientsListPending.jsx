import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { getPendingRequest } from '../../../services/api/doctorRoute'

const PatientsListPending = () => {

    let iduser;
    const jwtToken = localStorage.getItem('persist:root');

    if (JSON.parse(jwtToken).doctor !== "null") {
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

        const userId = decodedToken.id;
        iduser = userId
    }

    const { data: allPendingAppointment } = useQuery({
        queryKey: ["allPending", iduser],
        queryFn: getPendingRequest
    })

    console.log(allPendingAppointment);
    return (
        <div>

            <div className='w-[90%] mx-auto mt-10'>
                <h3 className='text-2xl font-info font-semibold'>Users</h3>

                <label className="input input-bordered flex items-center gap-2 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>                    <input type="text" className="grow" placeholder="Search" />
                </label>
            </div>
            <div>


                <div className="wrapper w-[90%] mt-10 border-[1px] border-gray-200 mx-auto shadow-md">




                    {
                        allPendingAppointment?.map((patient) => (
                            <div className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2">
                                <div className="div flex items-center justify-center gap-5">
                                    <img className='w-12 h-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                                    <p className='text-lg  font-semibold capitalize'>{patient?.firstname} {patient?.lastname}</p>
                                </div>
                                <div className="edit flex gap-3">
                                    {/* <button className={`${user?.status === "active" ? "bg-green-500 " : "bg-red-400"}  font-info px-5 py-1 rounded-md`} >{user?.status}</button> */}
                                    <Link className='bg-secondary text-white  font-info px-5 py-2 rounded-md' to={`/doctor/patients/${patient?._id}`}>View Details</Link>
                                    <button className='bg-[#8FE82B] text-white  font-info px-5 py-1 rounded-md' >{patient?.status}</button>
                                </div>
                            </div>

                        ))
                    }






                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">are you sure want to delete </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn bg-base-300">Cancel</button>
                                    <button className="btn  bg-red-400 ml-3">Delete</button>
                                </form>
                            </div>
                        </div>
                    </dialog>








                </div>

            </div>
        </div>
    )
}

export default PatientsListPending