import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SingleDoctorPending,
  verifyApplicationDoctor,
  sendInvoice,
} from "../../../services/api/adminRoute";
import { useFormik, Form, Formik, Field, replace } from "formik";
import { InvoiceValidation } from "../../../services/validation/InvoiceValidation";
import LoadingPage from "../../../pages/common/LoadingPage";
import { SocketContext } from "../../../store/redux/slices/SocketContext";

const initialValues = {
  message: "",
};

const ReviewDoctor = () => {
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (
    JSON.parse(jwtToken).user !== "null" ||
    JSON.parse(jwtToken).admin !== "null"
  ) {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }
  const { sendDataToServer, socket } = useContext(SocketContext);
  const { id } = useParams();
  const [invoicesend, setInvoiceSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const invoicRef = useRef(null);

  const queryClient = useQueryClient();
  const {
    data: singleDoctor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singleDoctors", id],
    queryFn: SingleDoctorPending,
  });
  // console.log(singleDoctor);
  const { mutate: sendInvoiceMutate } = useMutation({
    mutationFn: sendInvoice,
    onSuccess: (data) => {
      if (data.success) {
        sendDataToServer({
          socketId: socket.id,
          _id: iduser,
          recieverId: singleDoctor?.user,
        });
        setInvoiceSend(true);
        setLoading(false);
        queryClient.invalidateQueries(["singleDoctors"]);
        console.log("sucessfully send");
      }
    },
  });

  const hanleVerify = (userId) => {
    document.getElementById("my_modal_4").showModal();
  };

  const handleClick = () => {
    // sendDataToServer({ message: 'Hello, neymar' });
    let credential = {
      recieverId: singleDoctor?.user,
      message,
      name: singleDoctor?.lastname,
    };
    sendInvoiceMutate(credential);

    setLoading(true);
  };

  const { mutate: verifyApplicationMutate } = useMutation({
    mutationFn: verifyApplicationDoctor,
    onSettled: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["singleDoctors"]);
      }
    },
  });

  const handleApplicationVerify = () => {
    verifyApplicationMutate(singleDoctor?.user);
  };
  const testSocket = () => {
    sendDataToServer({
      socketId: socket.id,
      _id: iduser,
      recieverId: singleDoctor?.user,
    });
  };
  return (
    <>
      {isLoading && <p>loading...</p>}
      {isError && <p>loading...</p>}

      {!loading ? (
        <div className="w-[90%] mx-auto mt-10  max-h-[90vh] overflow-y-scroll ">
          <h3 className="text-2xl text-secondary font-info font-semibold ">
            Review Doctor
          </h3>
          <div className="info flex flex-col gap-3 mt-6">
            <img
              onClick={testSocket}
              className="w-32 h-[8rem] object-cover rounded-lg"
              src={singleDoctor?.profileImage}
              alt=""
            />
            <div className="des">
              <h3 className="text-secondary  fontinfo text-xl  font-semibold">
                <span>{singleDoctor?.firstname}</span> {singleDoctor?.lastname}
              </h3>
              <p className="text-gray-500">{singleDoctor?.speciality}</p>
            </div>
            <div className="butns flex gap-3">
              {singleDoctor?.verification === "true" ? (
                <button className="px-16 py-1 text-black bg-base-300 rounded-lg  ">
                  Verified
                </button>
              ) : (
                <button
                  className="px-16 py-1 text-black bg-base-300 rounded-lg  "
                  onClick={() => hanleVerify(singleDoctor?.user)}
                >
                  Verify
                </button>
              )}

              {singleDoctor?.status == "pending" ? (
                <button
                  onClick={() => invoicRef.current.showModal()}
                  className="px-16 py-1 text-black bg-[#8FE82B] rounded-lg "
                >
                  Send Invoice
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="descirption mt-10">
            <div className="in flex flex-col gap-1">
              <h3 className="text-secondary  fontinfo text-xl  font-semibold">
                License Number
              </h3>
              <p className="text-gray-500">{singleDoctor?.licenseNo}</p>
            </div>
          </div>

          <div className="descirption mt-10 w-[60%]">
            <div className="in flex flex-col gap-1">
              <h3 className="text-secondary  fontinfo text-xl  font-semibold">
                Qualification Description
              </h3>
              <p className="text-gray-500">{singleDoctor?.qualification}</p>
            </div>
          </div>

          <div className="descirption mt-10">
            <div className="in flex flex-col gap-1">
              <h3 className="text-secondary  fontinfo text-xl  font-semibold">
                Contact
              </h3>
              <div className="des mt-3">
                <h3 className="text-secondary  fontinfo text-md  font-semibold">
                  Email
                </h3>
                <p className="text-gray-500">{singleDoctor?.email}</p>
              </div>
              <div className="des mt-3">
                <h3 className="text-secondary  fontinfo text-md  font-semibold">
                  Phone No
                </h3>
                <p className="text-gray-500">
                  {singleDoctor?.phoneNo || "123456"}
                </p>
              </div>
            </div>
          </div>

          <div className="licencePic mt-10 flex flex-col gap-3">
            <h3 className="text-secondary  fontinfo text-xl  font-semibold">
              License Image
            </h3>

            <img
              className="w-[40%] h-[38vh] object-cover rounded-md"
              src={singleDoctor?.licenseImage}
              alt=""
            />
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}

      <dialog
        ref={invoicRef}
        id="my_modal_5"
        className="modal  modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Send Invoice</h3>
          <div className="modal-action  flex items-center justify-center">
            <form method="dialog">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                className="textarea w-[20rem] border-dashed border-2 border-secondary"
                placeholder="Message"
              ></textarea>

              <div className="div flex justify-end gap-5 mt-10">
                <button className="btn bg-base-300">Cancel</button>
                <button
                  onClick={handleClick}
                  className="btn bg-secondary text-white"
                >
                  send
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-4">are you sure want to verify doctor </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-base-300">Cancel</button>
              <button
                className="btn  bg-secondary text-white ml-3"
                onClick={handleApplicationVerify}
              >
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ReviewDoctor;
