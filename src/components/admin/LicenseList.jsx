import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addnewLicense,
  deleteLicense,
  getAllLicenses,
} from "../../services/api/adminRoute";
import CreditCardIcon from "@mui/icons-material/CreditCard";
const LicenseList = () => {
  const licenseRef = useRef(null);
  const deleteRef = useRef(null);
  const [license, setLicense] = useState("");
  const [licenseValue, setLicenseValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let id = "65eab6d166a0b15572caaf33";
  const { data: allLicenses } = useQuery({
    queryKey: ["licenses"],
    queryFn: getAllLicenses,
  });

  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteLicense,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["licenses"]);
      }
    },
  });

  const { mutate: deleteLicenseMutate } = useMutation({
    mutationFn: addnewLicense,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["licenses"]);
    },
  });

  const handleDelete = () => {
    deleteMutate({ licenseNo: license });
  };
  const check = allLicenses?.map((x) => x?.toLowerCase());
  const handleAdd = () => {
    console.log("data dilt");
    if (check?.includes(licenseValue?.toLowerCase())) {
      return setErrMsg("dublicate licence you added");
    }
    deleteLicenseMutate({ licenseNo: licenseValue });
  };
  const handleValue = (e) => {
    setLicenseValue(e.target.value);
  };
  return (
    <div>
      <div className="w-[90%]  mx-auto mt-10">
        <h3 className="text-2xl font-info font-semibold">Licenses</h3>

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
          </svg>{" "}
          <input type="text" className="grow" placeholder="Search" />
        </label>
      </div>
      <div className="div w-[90%] mx-auto mt-10">
        <button
          onClick={() => {
            setErrMsg("")
            licenseRef.current.showModal();
          }}
          className="bg-secondary text-white  font-info px-5 py-2 rounded-md"
        >
          Add license
        </button>
      </div>
      <p className="bg-red-s500 ml-12 mt-2 text-red-500 ">{errMsg}</p>
      <div className="wrapper w-[90%] h-[50vh] overflow-y-scroll mt-10 border-[1px] border-gray-200 mx-auto shadow-md">
        {allLicenses?.map((item, i) => (
          <div
            key={i}
            className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2"
          >
            <div className="div flex items-center justify-center gap-5">
              <CreditCardIcon />
              <p className="text-lg  font-semibold capitalize">{item}</p>
            </div>
            <div className="edit flex gap-3">
              <Link className="bg-secondary text-white  font-info px-5 py-2 rounded-md">
                View Details
              </Link>
              <button
                className="bg-red-400  font-info px-5 py-1 rounded-md"
                onClick={() => {
                  deleteRef.current.showModal();
                  setLicense(item);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <dialog
          ref={licenseRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add License</h3>
            <p className="py-4">are you trying to add license </p>
            <div className="modal-action">
              <form method="dialog" className="flex flex-col w-[80%] m-auto">
                <input
                  onChange={handleValue}
                  value={licenseValue}
                  className="border-[1px] py-3 rounded-lg  border-gray-300"
                  type="text"
                  name=""
                  id=""
                />
                <div className="flex  w-[60%] m-auto items-center gap-20 mt-10">
                  <button className="btn bg-base-300">Cancel</button>
                  <button className="btn  bg-red-400 ml-3" onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>

        <dialog
          ref={deleteRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <p className="py-4">are you sure want to delete </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn bg-base-300">Cancel</button>
                <button className="btn  bg-red-400 ml-3" onClick={handleDelete}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default LicenseList;
