import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../../store/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const DoctorModal = () => {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShown } = useSelector((state) => state.user);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && !isShown && (
        <div class="shadow-lg rounded w-full z-50 bg-white p-8 absolute top-0 left-0">
          <h2 className="text-xl font-bold mb-4">
            Become a Doctor on Our Website
          </h2>
          <p className="mb-4">
            Fill out the form below if you want to serve as a doctor on our
            website.
          </p>{" "}
          <div class="flex items-center justify-end mt-4">
            <button
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 mr-4"
              onClick={() => {
                setShowModal(false);
                dispatch(hideModal());
              }}
            >
              {" "}
              Cancel{" "}
            </button>
            <button
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              onClick={() => {
                navigate("/service/application_1");
                dispatch(hideModal());
              }}
            >
              {" "}
              Ok{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorModal;
