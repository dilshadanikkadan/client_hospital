import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getReviews,
  viewAppointment,
  viewDoctorSingle,
} from "../../../services/api/userRoute";
import { useNavigate, useParams } from "react-router-dom";
import { currentUser } from "../../../services/hooks/CuurentUser";
import ReviewModal from "./ReviewModal";
import EditReviewModal from "./EditReviewModal";

const ViewdoctorBox = () => {
  const userId = currentUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { id } = useParams();

  const { data: doctor } = useQuery({
    queryKey: ["doctos", id],
    queryFn: viewDoctorSingle,
  });

  const { data: myAppointment } = useQuery({
    queryKey: ["appointment", userId],
    queryFn: viewAppointment,
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", doctor?.user],
    queryFn: getReviews,
  });

  const reviewTotal = reviews?.reduce((acc, curr) => (acc += curr.rating), 0);
  const averageRating = reviewTotal / reviews?.length;
  const scaledRating = (averageRating / 5) * 5;
  console.log("scaled", scaledRating.toFixed(1));
  const appointmentReview = myAppointment?.filter(
    (x) => x.status === "completed" || "pending"
  );
  const myReview = reviews?.find((x) => x.patient._id == userId);
  return (
    <div className="w-[80%] m-auto">
      <div className="doctorInfo mt-10 flex justify-between items-center flex-col md:flex-row">
        <div className="div flex gap-10 items-center">
          <img
            className="w-28 h-28 rounded-full object-cover"
            src={doctor?.profileImage}
            alt=""
          />

          <div className="div">
            <p className="font-semibold text-xl">
              {doctor?.firstname} {doctor?.lastname}
            </p>
            <p>{doctor?.speciality}</p>
          </div>
        </div>
        <div className="ingo">
          <button
            className="py-2 rounded-lg px-3 mt-5 md:mt-0 bg-secondary text-white"
            onClick={() =>
              navigate("/makeAppointment", {
                state: {
                  ...doctor,
                },
              })
            }
          >
            Make An Appointment
          </button>
        </div>
      </div>

      <div className="cardWrapper hidden mt-10 md:flex gap-8 ">
        <div className="card w-1/3 border-[1px] border-gray-300 h-[15vh] flex items-center justify-center">
          <p className="text-xl font-semibold capitalize">
            {scaledRating ? scaledRating.toFixed(1) : "0"} <span>rating</span>
          </p>
        </div>
        <div className="card w-1/3 border-[1px] border-gray-300 h-[15vh] flex items-center justify-center">
          <p className="text-xl font-semibold capitalize">
            {reviews?.length} <span>Reviews</span>
          </p>
        </div>
        <div className="card w-1/3 border-[1px] border-gray-300 h-[15vh] flex items-center justify-center">
          <p className="text-xl font-semibold capitalize">
            1 <span>Patients</span>
          </p>
        </div>
      </div>

      <div className="details mt-10 flex flex-col gap-4">
        {/* <h3 className='text-2xl font-semibold  mb-5'>Details</h3> */}

        <div className="div flex flex-col gap-2">
          <p className="font-semibold text-xl">Speciality</p>
          <p className="text-gray-400">{doctor?.speciality}</p>
        </div>

        <div className="div flex flex-col gap-2">
          <p className="font-semibold text-xl">Email</p>
          <p className="text-gray-400">{doctor?.email}</p>
        </div>
      </div>

      {appointmentReview?.map((x) => x.doctorListId).includes(doctor?.user) &&
      appointmentReview?.map((x) => x.status).includes("completed") &&
      reviews?.map((x) => x.patient._id).includes(userId) &&
      reviews?.length > 0 ? (
        <p
          onClick={() => setIsOpenEdit(true)}
          className="py-2 text-center rounded-md  w-[17%] text-white bg-secondary mt-3"
        >
          edit{" "}
        </p>
      ) : appointmentReview
          ?.map((x) => x.doctorListId)
          .includes(doctor?.user) &&
        appointmentReview?.map((x) => x.status).includes("completed") ? (
        <p
          onClick={() => setIsOpen(true)}
          className="py-2 text-center rounded-md  w-[17%] text-white bg-secondary mt-3"
        >
          Review Your Doctor
        </p>
      ) : (
        ""
      )}

      {isOpen && (
        <ReviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          doctorListId={doctor?.user}
          doctor={doctor?._id}
          patient={userId}
        />
      )}

      {isOpenEdit && (
        <EditReviewModal
          reviewId={myReview._id}
          ratingNum={myReview?.rating}
          reviewTextUPdating={myReview?.reviewText}
          setIsOpenEdit={setIsOpenEdit}
        />
      )}
      <div className="patientreviews mt-10">
        <h3 className="text-2xl capitalize font-semibold">Patient Reviews</h3>

        {reviews?.map((item, i) => (
          <div key={i} className="div  mt-10  mb-10 flex flex-col gap-1">
            <p className="capitalize font-serif  font-semibold">
              {item?.patient.username}
            </p>
            <p className="text-gray-400 ">mar - 21</p>
            <div className="rating">
              {Array(item?.rating)
                .fill("_")
                .map((x, i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    disabled
                  />
                ))}
            </div>
            <p>{item?.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewdoctorBox;
