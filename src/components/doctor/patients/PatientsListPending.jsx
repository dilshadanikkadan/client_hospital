import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPendingRequest } from '../../../services/api/doctorRoute'
import { getAllDoctors } from '../../../services/api/userRoute'

const PatientsListPending = () => {
    const [selectDate, setSelectDate] = useState("27");
    const [todaysAppointments, setTodaysApoointment] = useState([])

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

    const { data: allDoctors } = useQuery({
        queryKey: ["allDoctors"],
        queryFn: getAllDoctors
    })
    const filetred = allPendingAppointment?.filter((patient) => patient.status === "pending")
    const availbeleDates = allDoctors?.find((doctor) => doctor.user === iduser).BookedDates
    // console.log("all doctors", availbeleDates);
    // console.log("iduser",iduser);

    const handleDateChange = (event, i) => {
        setSelectDate(event.target.value);
    };
    console.log("selectDate", selectDate);
    useEffect(() => {
        setTodaysApoointment([]);

        let newOne = filetred?.filter((user) => {
            console.log("user", user.date === selectDate);
            if (user.date === selectDate) {
                setTodaysApoointment((prev) => [...prev, user]);
            }
            return null;
        });
    }, [selectDate]);

    console.log("todaysAppointments", todaysAppointments);

    return (
        <div>
            <div className='w-[90%] mx-auto mt-10 '>
                <h3 className='text-2xl font-info font-semibold ml-10'>Pending List</h3>
                {/* 
                <label className="input input-bordered flex items-center gap-2 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>                    <input type="text" className="grow" placeholder="Search" />
                </label>
            </div>
            <div> */}

                <select className="select select-bordered w-[40%] ml-10 mt-5" onChange={handleDateChange}>
                    <option disabled defaultValue="" className="py-2 text-gray-500">Dates</option>

                    {availbeleDates?.map((item, i) => (
                        <option key={i} className=" cursor-pointer bg-gray-100 hover:bg-red-200">
                            {item?.date}
                        </option>
                    ))}
                </select>
                <p className='ml-10 mt-3 font-bold subpixel-antialiased text-xl' > March {selectDate} th Pending Appointments</p>

                <div className="wrapper w-[90%] mt-5 border-[1px] border-gray-200 mx-auto shadow-md">

                    {
                        todaysAppointments.length > 0 ?
                            todaysAppointments?.sort((a, b) => {
                                const [hourA, minuteA] = a.timeSelected.split(':').map(num => parseInt(num));
                                const [hourB, minuteB] = b.timeSelected.split(':').map(num => parseInt(num));
                                if (hourA !== hourB) {
                                    if (hourA === 12) return -1;
                                    if (hourB === 12) return 1;
                                    return hourA - hourB;
                                } else {
                                    return minuteA - minuteB;
                                }

                            }).map((patient) => (
                                <div className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2">
                                    <div className="div flex items-center justify-center gap-5">
                                        <img className='w-12 h-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                                        <p className='text-lg  font-semibold capitalize'>{patient?.firstname} {patient?.lastname}</p>
                                    </div>
                                    <div className="edit flex gap-3">
                                        {/* <button className={`${user?.status === "active" ? "bg-green-500 " : "bg-red-400"}  font-info px-5 py-1 rounded-md`} >{user?.status}</button> */}
                                        <Link className='bg-secondary text-white  font-info px-5 py-2 rounded-md' to={`/doctor/patients/${patient?._id}`}>View Details</Link>
                                        <button className='bg-[#8FE82B] text-white  font-info px-5 py-1 rounded-md' >{patient?.status}</button>
                                        <button className='bg-secondary text-white  font-info px-5 py-1 rounded-md' >{patient?.timeSelected}</button>
                                    </div>
                                </div>

                            ))
                            :
                            <div>
                                <p className='py-3 ml-10 font-semibold'>No Patines For This Day</p>
                            </div>
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