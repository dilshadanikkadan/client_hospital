import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getAllDoctors, makeAppointment } from '../../../services/api/userRoute'
import { current } from '@reduxjs/toolkit';
import { useLocation, useNavigate } from 'react-router-dom';

const AppointmentTwoBox = () => {

    let iduser;
    const jwtToken = localStorage.getItem('persist:root');

    if (JSON.parse(jwtToken).user !== "null") {
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

        const userId = decodedToken.id;
        iduser = userId
    }


    const navigate = useNavigate()
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [dateChecked, setDateChecked] = useState(false)
    const [selsctedDate, setSelectDate] = useState("")
    const [selectedMonth, setSelectMonth] = useState("")
    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [time, setTime] = useState(null)
    const [newBookedId, setNewBookedId] = useState("")

    const [idUser, setIdUser] = useState(""); 
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(selectedDoctor && dateChecked && selsctedDate && selectedMonth && time);
    }, [selectedDoctor, dateChecked, selsctedDate, selectedMonth, time]);

    const { state } = useLocation()
    console.log(state);

    const { mutate: makeAppointmentMutate } = useMutation({
        mutationFn: makeAppointment,
        onSuccess: (data) => {
            if (data.success) {
                navigate("/makeAppointment/_2/sucess", { replace: true })
            }
        }
    })





    const { data: allDoctors } = useQuery({
        queryKey: ["allDoctors"],
        queryFn: getAllDoctors
    })

   
    const handleDoctorChange = (event, i) => {
        setSelectedDoctor(event.target.value);
    };
    const slectedDoctorData = allDoctors?.filter((x) => x.lastname == selectedDoctor.split(" ")[1]);
    console.log(slectedDoctorData);

    const handleDateBoxClick = (dates) => {
        setDateChecked(true)
        setNewBookedId(dates._id)
        setSelectDate(dates.date)
        setSelectMonth(dates.month)
        console.log("Clicked date:", dates);
    };


    const handleTime = (obj) => {
        setTime(obj)
    }

    const handleSubmit = () => {
        console.log(time);


        makeAppointmentMutate({
            ...state,
            bookedId: newBookedId,
            doctor: slectedDoctorData[0]._id,
            doctorListId: slectedDoctorData[0].user,
            patient: iduser,
            date: selsctedDate,
            month: selectedMonth,
            time: {
                from: time.from,
                to: time.to,
                id: time._id
            }

        })
 
    }

    return (
        <div className="form w-[28%] m-auto mt-10 flex flex-col relative custom-select  ">
           {
               selectedDoctor.length >0 ?
               <div className='w-[10vw] h-[25vh] shadow-md  absolute right-[-150px] flex flex-col items-center '>
                <img className='h-24 w-24 rounded-lg object-cover' src={slectedDoctorData[0]?.profileImage} alt="" />
                <p className='capitalize font-semibold mt-3'>{slectedDoctorData[0]?.lastname}</p>
                <p className='capitalize font-semibold'>{slectedDoctorData[0]?.speciality}</p>

            </div>
            :""
            }
            <select className="select select-bordered w-full max-w-xs" onChange={handleDoctorChange}>
                <option disabled selected className="py-2">Select A Doctor</option>

                {
                    allDoctors?.map((doctor, i) => (

                        <option key={i} className="py-2 bg-gray-100 hover:bg-red-200">{doctor?.firstname} {doctor?.lastname}</option>
                    ))
                }
            </select>

            <p className=' font-semibold mt-3'>Availabe Dates
            </p>

            <div className="warpapper w-[24vw] h-auto mt-3 pb-10 bg-base-100 border-[1px] border-gray-200 rounded-lg shadow-xl relative">

                <div className="wrap w-[90%] m-auto mt-5 flex flex-wrap gap-3">

                    {
                        slectedDoctorData?.length > 0 ?

                            slectedDoctorData[0]?.BookedDates?.map((dates) => (
                                <div
                                    disabled={true}
                                    onClick={() => handleDateBoxClick(dates)}

                                    className={`dateBox w-[12%] h-10 rounded-lg relative ${selsctedDate === dates.date ? "bg-secondary" : "bg-[#8FE82B]"}    flex flex-col items-center  justify-center`}>

                                    <p className='text-white text-1xl'>{dates?.date}</p>
                                </div>

                            ))


                            : ""

                    }


                </div>
            </div>

            <p className=' font-semibold mt-3'>Availabe Time
            </p>

            <div className="warpapper w-[24vw] h-auto mt-3 pb-10 bg-base-100 border-[1px] border-gray-200 rounded-lg shadow-xl relative">

                <div className="wrap w-[90%] m-auto mt-5 flex flex-wrap gap-3">
                    {
                        dateChecked ?
                            slectedDoctorData[0]?.BookedDates?.filter((x) => x.date === selsctedDate)[0].time?.map((timeData) => (

                                <div
                                    className={`dateBox w-[40%] h-8 ${timeData?.status === "success" ? "hidden" : "flex"}   rounded-lg relative ${time?.to === timeData?.to ? "bg-secondary" : "bg-[#8FE82B]"}  flex  items-center  justify-center `} onClick={() => handleTime(timeData)}>

                                    <p className='text-white text-1xl'>{timeData?.from} to {timeData?.to} </p>
                                </div>

                            ))

                            : ""
                    }
                </div>


            </div>

            <div className='w-[87%] flec items-center justify-end'>

                <button
                    className={`py-3 w-[52%] mt-5 float-right text-white bg-[#8FE82B] rounded-lg ${!isFormValid ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Make An Appointment
                </button>

            </div>

        </div>




    )
}

export default AppointmentTwoBox