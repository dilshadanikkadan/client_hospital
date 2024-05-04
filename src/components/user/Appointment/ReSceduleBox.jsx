import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getAllDoctors,
  makeAppointment,
  reScheduleAppointment,
  creatChatRoom,
} from "../../../services/api/userRoute";
import { current } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";

const ReSceduleBox = () => {
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (JSON.parse(jwtToken).user !== "null") {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }

  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dateChecked, setDateChecked] = useState(false);
  const [selsctedDate, setSelectDate] = useState("");
  const [selectedMonth, setSelectMonth] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [time, setTime] = useState(null);
  const [newBookedId, setNewBookedId] = useState("");
  const [change, setChange] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [timeSelected, setTimeSelected] = useState("");

  const { data: allDoctors } = useQuery({
    queryKey: ["allDoctors"],
    queryFn: getAllDoctors,
  });

  const { state } = useLocation();
  useEffect(() => {
    if (state !== null || undefined) {
      !change
        ? setSelectedDoctor(`${state?.firstname} ${state?.lastname}`)
        : "";
      console.log("wroked here insed");
    } else {
      console.log("wroked here outside");
    }
    setIsFormValid(
      selectedDoctor && dateChecked && selsctedDate && selectedMonth && time
    );
  }, [selectedDoctor, dateChecked, selsctedDate, selectedMonth, time]);

  const handleDoctorChange = (event, i) => {
    setChange(true);
    console.log(event.target.value);
    setSelectedDoctor(event.target.value);
  };
  const slectedDoctorData = allDoctors?.filter(
    (x) => x?.lastname == selectedDoctor?.split(" ")[1]
  );
  const { mutate: createRoomMutate } = useMutation({
    mutationFn: creatChatRoom,
    onSuccess: (data) => {
      if (data) {
        console.log("chat also created ");
      }
    },
  });

  // create chatting for patients
  const { mutate: rescheduleMutate } = useMutation({
    mutationFn: reScheduleAppointment,
    onSuccess: (data) => {
      if (data.success) {
        createRoomMutate({
          senderId: slectedDoctorData[0]?.user,
          reciverId: iduser,
        });
        navigate("/makeAppointment/_2/sucess", { replace: true });
      }
    },
  });
  console.log(state);

  const handleDateBoxClick = (dates) => {
    setDateChecked(true);
    setNewBookedId(dates._id);
    setSelectDate(dates.date);
    setSelectMonth(dates.month);
    console.log("Clicked date:", dates);
  };

  const handleTime = (obj) => {
    setTime(obj);
  };
  const handleSubmit = () => {
    console.log({
      prevDoctodId: state?.prevDoctodId,
      prevTimeId: state?.prevTimeId,
      prevBookedId: state?.prevBookedId,
      appointmentId: state?.myAppointmentId,
      newDoctorId: slectedDoctorData[0]?.user,
      newTimeId: time[0]?._id,
      newBookedId: newBookedId,
      date: selsctedDate,
      prevTimeSelected: state?.prevTimeSelected,
      timeSelected,
      time: {
        from: time[0].from,
        to: time[0].to,
        id: time[0]._id,
      },
    });

    rescheduleMutate({
      prevDoctodId: state?.prevDoctodId,
      prevTimeId: state?.prevTimeId,
      prevBookedId: state?.prevBookedId,
      appointmentId: state?.myAppointmentId,
      newDoctorId: slectedDoctorData[0]?.user,
      newTimeId: time[0]?._id,
      newBookedId: newBookedId,
      prevTimeSelected: state?.prevTimeSelected,
      date: selsctedDate,
      timeSelected,
      time: {
        from: time[0].from,
        to: time[0].to,
        id: time[0]._id,
      },
    });
  };

  return (
    <div className="form w-[80%] md:w-[28%]  m-auto mt-10 flex flex-col relative custom-select  ">
      {selectedDoctor?.length > 0 &&
      selectedDoctor &&
      slectedDoctorData?.length > 0 ? (
        <div className="min-w-[10vw] hidden md:h-[15vh] lg:h-[28vh] shadow-md  absolute right-[-50%] md:flex flex-col items-center ">
          <img
            className="h-24 w-24 rounded-lg object-cover"
            src={slectedDoctorData[0].profileImage}
            alt=""
          />
          <p className="capitalize font-semibold mt-3">
            {slectedDoctorData[0].lastname}
          </p>
          <p className="capitalize font-semibold">
            {slectedDoctorData[0].speciality}
          </p>
        </div>
      ) : null}

      <div className="div mb-5 ">
        <h3>Amount</h3>
        <p className="py-2 w-[25%] border-[1px] border-gray-200 text-center rounded-md">
          799
        </p>
      </div>
      <select
        className="select select-bordered w-full "
        onChange={handleDoctorChange}
      >
        <option disabled selected className="py-2">
          Select A Doctor
        </option>

        {allDoctors?.map((doctor, i) => (
          <option
            key={i}
            className="py-2 cursor-pointer   bg-gray-100 hover:bg-red-200"
          >
            {doctor?.firstname} {doctor?.lastname}
          </option>
        ))}
      </select>

      <p className=" font-semibold mt-3">Availabe Dates</p>

      <div className="warpapper w-[100%] md:w-[100%]  h-auto mt-3 pb-10 bg-base-100 border-[1px] border-gray-200 rounded-lg shadow-xl relative">
        <div className="wrap cursor-pointer w-[90%] m-auto mt-5 flex flex-wrap gap-3">
          {slectedDoctorData?.length > 0
            ? slectedDoctorData[0]?.BookedDates?.map((dates) => (
                <div
                  disabled={true}
                  onClick={() => handleDateBoxClick(dates)}
                  className={`dateBox w-[12%] h-10 rounded-lg relative ${
                    selsctedDate === dates.date
                      ? "bg-secondary"
                      : "border-[1px] border-secondary text-secondary"
                  }    flex flex-col items-center  justify-center`}
                >
                  <p
                    className={`${
                      selsctedDate === dates.date
                        ? "text-white"
                        : "text-secondary"
                    }  text-secondary text-1xl`}
                  >
                    {dates?.date}
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>

      <p className=" font-semibold mt-3">Availabe Time</p>

      <div className="warpapper w-[100%] md:w-[100%] h-auto mt-3 pb-10 bg-base-100 border-[1px] border-gray-200 rounded-lg shadow-xl relative">
        <div className="wrap w-[90%] m-auto mt-5 flex flex-wrap gap-3">
          {dateChecked
            ? slectedDoctorData[0]?.BookedDates?.find(
                (x) => x.date === selsctedDate
              ).time[0].availbaleTimes?.map((timeData) => (
                <div
                  className={`dateBox w-[40%] h-8 ${
                    timeData?.status === "booked" ? "hidden" : "flex"
                  }   rounded-lg relative ${
                    timeSelected === timeData?.from
                      ? "bg-secondary"
                      : "border-[1px] border-secondary"
                  }  flex cursor-pointer  items-center  justify-center `}
                  onClick={() =>
                    handleTime(
                      slectedDoctorData[0]?.BookedDates?.find(
                        (x) => x.date === selsctedDate
                      ).time
                    )
                  }
                >
                  <p
                    className={`${
                      timeSelected === timeData?.from
                        ? "text-white"
                        : "text-secondary"
                    }  text-secondary text-1xl`}
                    onClick={() => {
                      setTimeSelected(timeData?.from);
                    }}
                  >
                    {timeData?.from}{" "}
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>

      <div className="w-[87%] flec items-center justify-end">
        <button
          className={`py-3 w-[82%] lg:w-[52%] mt-5 float-right text-white bg-secondary rounded-lg ${
            !isFormValid ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReSceduleBox;
