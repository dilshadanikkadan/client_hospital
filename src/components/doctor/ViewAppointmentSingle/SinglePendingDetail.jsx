import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  creatChatRoom,
  viewAppointment,
} from "../../../services/api/userRoute";
import { useNavigate, useParams } from "react-router-dom";
import { approveAppointment } from "../../../services/api/doctorRoute";
import axios from "axios";
import { currentUser } from "../../../services/hooks/CuurentUser";

const SinglePendingDetail = () => {
  const queryClient = useQueryClient();
  const [pdf, setPdf] = useState("");
  const { id } = useParams();
  const myId = currentUser();
  const navigate = useNavigate();
  const { data: appointment } = useQuery({
    queryKey: ["appointment", id],
    queryFn: viewAppointment,
  });

  const { mutate: approveAppointmentMutate } = useMutation({
    mutationFn: approveAppointment,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["appointment"]);
        console.log("sucess fully updatede");
      }
    },
  });
  let singleAppointment = appointment?.find(
    (x) => x.status === "completed" || "pending"
  );
  const handleapproval = async () => {
    const dataOne = new FormData();
    dataOne.append("file", pdf);
    dataOne.append("upload_preset", "application");
    console.log(pdf);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqq5x5x6/upload",
        dataOne,
        {
          withCredentials: false,
        }
      );
      approveAppointmentMutate({
        apppointmentId: singleAppointment?._id,
        presciptionLink: res.data.url,
        myId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePresiptionPdf = (e) => {
    setPdf(e.target.files[0]);
  };
  const { mutate: createRoomMutate } = useMutation({
    mutationFn: creatChatRoom,
    onSuccess: (data) => {
      if (data) {
        navigate("/doctor/chat");
      }
    },
  });

  const handleHChatCreation = () => {
    console.log({
      senderId: myId,
      reciverId: singleAppointment?.patient,
    });
    createRoomMutate({
      senderId: myId,
      reciverId: singleAppointment?.patient,
    });
  };
  return (
    <div className=" m-auto  mt-14">
      <h3 className="font-info font-semibold text-2xl capitalize ml-[15%]">
        {" "}
        Appointment Details
      </h3>
      <div className="w-[100%] md:w-[70%] overflow-hidden m-auto pb-10 flex flex-col justify-center mt-5 border-[1px] border-gray-200 shadow-md">
        <div className="w-[80%] m-auto relative  mt-10 ">
          <button
            className="py-1 px-4 bg-secondary rounded-md  text-white absolute right-0 top-0"
            onClick={handleHChatCreation}
          >
            Create Chat
          </button>
          <div className="details ">
            <div className="userinfo flex items-center  gap-3 mt-6">
              <img
                className="w-14 h-14 object-cover rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
                alt=""
              />
              <div className="details">
                <h3 className="font-semibold font-desc">
                  {singleAppointment?.lastname}
                </h3>
                <p className="text-xs md:text-sm">{singleAppointment?.email}</p>
              </div>
            </div>
            <div className="appoInfo mt-5 ">
              <div className="deatils w-full flex  flex-col gap-3 mt-3">
                <div className="info flex justify-between text-lg">
                  <p className="subpixel-antialiased"> Date</p>
                  <p>
                    {singleAppointment?.date} - {singleAppointment?.month} -
                    2024
                  </p>
                </div>
                <div className="info  flex justify-between text-lg">
                  <p className="subpixel-antialiased">Time</p>
                  <p>{singleAppointment?.timeSelected}</p>
                </div>
                <div className="info  flex justify-between text-lg">
                  <p className="subpixel-antialiased">Status</p>
                  <p className="capitalize">{singleAppointment?.status}</p>
                </div>
                <div className="info  flex justify-between text-lg">
                  <p className="subpixel-antialiased">reason</p>
                  <p className="subpixel-antialiased">
                    {singleAppointment?.reason}
                  </p>
                </div>
                <div className="info  flex justify-between text-lg">
                  <p className="subpixel-antialiased">Prescription</p>
                  {singleAppointment?.status === "completed" ? (
                    <p>Updated</p>
                  ) : (
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-xs w-full max-w-[6rem]"
                      onChange={handlePresiptionPdf}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div w-[60%] m-auto flex   items-center justify-center gap-10">
          <button className="mt-6 bg-base-300  py-2 px-6 rounded-lg ">
            Cancel
          </button>

          {singleAppointment?.status === "completed" ? (
            <button className="mt-6 bg-secondary text-white  py-2 px-6 rounded-lg ">
              completed
            </button>
          ) : (
            <button
              className="mt-6 bg-secondary text-white  py-2 px-6 rounded-lg "
              onClick={handleapproval}
            >
              update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePendingDetail;
