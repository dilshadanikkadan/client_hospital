import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPendingRequest } from "../../../services/api/doctorRoute";
import { getAllDoctors } from "../../../services/api/userRoute";

const PatientsListPending = () => {
  let date = new Date().getDate();
  let currentDate = date > 9 ? date : `0${date}`;
  const [selectDate, setSelectDate] = useState(currentDate);
  const [todaysAppointments, setTodaysApoointment] = useState([]);

  console.log(selectDate);
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");
  if (JSON.parse(jwtToken).doctor !== "null") {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
    const userId = decodedToken.id;
    iduser = userId;
  }
  const { data: allPendingAppointment } = useQuery({
    queryKey: ["allPending", iduser],
    queryFn: getPendingRequest,
  });

  const { data: allDoctors } = useQuery({
    queryKey: ["allDoctors"],
    queryFn: getAllDoctors,
  });
  const filetred = allPendingAppointment?.filter(
    (patient) => patient.status === "pending"
  );
  const availbeleDates = allDoctors?.find(
    (doctor) => doctor.user === iduser
  ).BookedDates;

  const handleDateChange = (event, i) => {
    console.log("sleceted", event.target.value);
    setSelectDate(event.target.value);
  };
  console.log("filtered", filetred);


  useEffect(() => {
    if (allPendingAppointment) {
      const filteredAppointments = filetred.filter(
        (user) => user.date === selectDate
      );
      setTodaysApoointment(filteredAppointments);
    }
  }, [selectDate]);

  console.log("todaysAppointments", todaysAppointments);
  return (
    <div>
      <div className="w-[100%] md:w-[90%] mx-auto mt-10 ">
        <h3 className="text-2xl font-info font-semibold ml-4 md:ml-10">Pending List</h3>

        <select
          className="select select-bordered w-[40%] ml-4 md:ml-10 mt-5"
          onChange={handleDateChange}
        >
          <option  defaultValue="" className="py-2 text-gray-500">
            Dates
          </option>

          {availbeleDates?.map((item, i) => (
            <option
              key={i}
              className=" cursor-pointer bg-gray-100 hover:bg-red-200"
            >
              {item?.date}
            </option>
          ))}
        </select>
        <p className="ml-4 md:ml-10 mt-3 font-bold subpixel-antialiased text-xl">
          {" "}
          Auguest{selectDate} th Pending Appointments
        </p>

        <div className="wrapper w-[90%] mt-5 border-[1px] border-gray-200 mx-auto shadow-md">
          {todaysAppointments.length > 0 ? (
            todaysAppointments
              ?.sort((a, b) => {
                const [hourA, minuteA] = a.timeSelected
                  .split(":")
                  .map((num) => parseInt(num));
                const [hourB, minuteB] = b.timeSelected
                  .split(":")
                  .map((num) => parseInt(num));
                if (hourA !== hourB) {
                  if (hourA === 12) return -1;
                  if (hourB === 12) return 1;
                  return hourA - hourB;
                } else {
                  return minuteA - minuteB;
                }
              })
              .map((patient, i) => (
                <div
                  key={i}
                  className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2"
                >
                  <div className="div flex items-center justify-center gap-5">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
                      alt=""
                    />
                    <p className="text-lg  font-semibold capitalize">
                      {patient?.firstname} {patient?.lastname}
                    </p>
                  </div>
                  <div className="edit flex flex-col mr-8 md:flex-row md:mr-0 gap-3">
                    {/* <button className={`${user?.status === "active" ? "bg-green-500 " : "bg-red-400"}  font-info px-5 py-1 rounded-md`} >{user?.status}</button> */}
                    <Link
                      className="bg-secondary text-white  font-info px-5 py-2 rounded-md"
                      to={`/doctor/patients/${patient?._id}`}
                    >
                      {" "}
                      Details
                    </Link>
                    <button className="bg-[#8FE82B] text-white  font-info px-5 py-1 rounded-md hidden md:block">
                      {patient?.status}
                    </button>
                    <button className="bg-secondary text-white  font-info px-5 py-1 rounded-md">
                      {patient?.timeSelected}
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div>
              <p className="py-3 ml-12 font-semibold">
                No Patines For This Day
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PatientsListPending;
