import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { allPendingDoctorRequest } from "../../../services/api/adminRoute";
import { Link } from "react-router-dom";

const DoctorPendingList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const {
    data: allPending,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctorspending"],
    queryFn: allPendingDoctorRequest,
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = allPending?.DoctorsData?.filter(
    (doctor) =>
      doctor?.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.speciality?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="antialiased text-gray-600 w-full px-4 mt-20">
        <div className="flex flex-col justify-center">
          <div className="w-full max-w-[62rem] mx-auto bg-white h-[85vh] overflow-y-scroll shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Pending Requests</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-scroll md:overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input input-bordered mb-4"
                  placeholder="Search"
                />
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Email</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Speciality
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Status</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {isLoading && (
                      <tr>
                        <td>Loading...</td>
                      </tr>
                    )}
                    {isError && (
                      <tr>
                        <td>Error fetching data</td>
                      </tr>
                    )}
                    {currentData &&
                      currentData.map((doctor) => (
                        <tr key={doctor._id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  className="rounded-full"
                                  src={doctor.profileImage}
                                  width={35}
                                  height={35}
                                  alt={`${doctor.firstname} ${doctor.lastname}`}
                                />
                              </div>
                              <div className="font-medium text-gray-800">
                                <span>{doctor.firstname}</span>{" "}
                                {doctor.lastname}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{doctor.email}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              {doctor.speciality}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap flex items-center justify-center">
                            <Link
                              to={`/admin/pending_doctorRequests/${doctor._id}`}
                              className="bg-secondary text-white py-1 px-3 rounded-md"
                            >
                              {" "}
                              View Details
                            </Link>
                            <button className="bg-secondary text-white py-1 px-3 rounded-md ml-2">
                              {doctor.verification === "true"
                                ? "Approved"
                                : doctor.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 py-1 px-3 rounded-md ${
                    currentPage === index + 1
                      ? "bg-secondary text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorPendingList;
