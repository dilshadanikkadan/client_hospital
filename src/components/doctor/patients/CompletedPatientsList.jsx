import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPendingRequest } from "../../../services/api/doctorRoute";

const CompletedPatientsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 4;

  let iduser;
  const jwtToken = localStorage.getItem("persist:root");
  if (JSON.parse(jwtToken).doctor !== "null") {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
    iduser = decodedToken.id;
  }

  const { data: allPendingAppointment } = useQuery({
    queryKey: ["allPending", iduser],
    queryFn: getPendingRequest,
  });

  const filteredPatients = allPendingAppointment?.filter(
    (patient) =>
      patient.status === "completed" &&
      patient.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients?.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="w-[90%] mx-auto mt-10">
        <h3 className="text-2xl font-info font-semibold">Patients History</h3>
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>
      <div>
        <div className="wrapper w-[90%] mt-10 border-[1px] border-gray-200 mx-auto shadow-md">
          {currentPatients?.map((patient) => (
            <div
              key={patient?._id}
              className="user flex gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2"
            >
              <div className="div flex items-center justify-center gap-5">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
                  alt=""
                />
                <p className="text-lg font-semibold capitalize">
                  {patient?.firstname} {patient?.lastname}
                </p>
              </div>
              <div className="edit flex gap-3">
                <Link
                  className="bg-secondary text-white font-info px-5 py-2 rounded-md"
                  to={`/doctor/patients/${patient?._id}`}
                >
                  {" "}
                  Details
                </Link>
                <button className="bg-[#8FE82B] text-white font-info px-5 py-1 rounded-md hidden md:block">
                  {patient?.status}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination mt-4 flex justify-center">
          {filteredPatients &&
            Math.ceil(filteredPatients.length / patientsPerPage) > 1 &&
            Array.from(
              { length: Math.ceil(filteredPatients.length / patientsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`pagination-link  ${
                    currentPage === i + 1
                      ? "active  bg-secondary text-white py-[3px] px-2 rounded-md ml-2 "
                      : "bg-secondary text-white py-[3px] px-2 rounded-md ml-2"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default CompletedPatientsList;
