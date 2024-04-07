import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSetDate,
  getAllDates,
  setDates,
} from "../../../services/api/doctorRoute";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import DateModal from "./DateModal";
import BookesDates from "./BookesDates";

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const SetDates = () => {
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (JSON.parse(jwtToken).doctor !== "null") {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }
  const [dateArray, setDateArray] = React.useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const queryClient = useQueryClient();

  const [selectDate, setSelectDate] = React.useState({
    id: "",
    day: "",
    month: "",
    CurrentDate: "",
    year: "",
  });

  const { data: allDates } = useQuery({
    queryKey: ["allDates", iduser],
    queryFn: getAllDates,
  });
  const { mutate: setDateMutate } = useMutation({
    mutationFn: setDates,
    onSuccess: (data) => {
      if (data.success) {
        console.log("sussessfully done");
        queryClient.invalidateQueries(["allDates"]);
      }
    },
  });

  const handleDateChange = (date) => {
    setErrorMsg("");
    let NewDate = date.$d.toString().split(" ");

    setSelectDate({
      id: Date.now(),
      CurrentDate: NewDate[2],
    });
    addArray({
      date: NewDate[2],
      month: NewDate[1],
      day: NewDate[0],
      year: NewDate[3],
    });
  };

  const addArray = (obj) => {
    const date = new Date();
    let currentDay = date.getDate();
    console.log(date);
    let currentMonth = date.getMonth();
    let checkingMonth = monthNames.findIndex((x) =>
      x.includes(obj.month.toLowerCase())
    );
    console.log("checking month is  :" + checkingMonth);
    console.log("current month is  :" + currentMonth);
    if (allDates.map((x) => x.date).includes(obj.date)) {
      console.log("eroor got btoh");
      return setErrorMsg("already exist the date");
    } else if (obj.date < currentDay || checkingMonth !== currentMonth) {
      console.log("eroor got btoh");
      return setErrorMsg("you can't add previos dates");
    }
    setDateArray((prev) => [...prev, obj]);
    setDateMutate({
      doctorId: iduser,
      dateObj: obj,
    });
  };

  const { mutate: deleteSetDataMutate } = useMutation({
    mutationFn: deleteSetDate,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["allDates"]);
      }
    },
  });

  const handledeleteDate = (id) => {
    deleteSetDataMutate({
      userId: iduser,
      dateObjId: id,
    });
  };

  const handleModal = (id) => {
    setIsOpen(true);
    setCurrentId(id);
  };
  return (
    <div className="flex  w-[80%] mx-auto  ">
      <div className="wrapper flex flex-wrap gap-10   items-center justify-center ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="calenderBox" onChange={handleDateChange} />
        </LocalizationProvider>
        <div className="warpapper w-[100%] h-[35vh] md:w-[35vw] md:h-[50vh] overflow-y-scroll bg-base-100  border-[1px] border-gray-300 rounded-lg  relative">
          {errorMsg && (
            <p className="mt-3 ml-3 capitalize text-red-500">{errorMsg}</p>
          )}
          <div className="wrap w-[90%] m-auto mt-5 flex flex-wrap gap-3">
            {allDates?.map((item, i) => (
              <div
                key={item._id + Date.now()}
                className="dateBox cursor-pointer w-[16%] md:w-[12%] h-12 rounded-lg relative border-[1px] border-secondary  flex flex-col items-center"
              >
                <CancelIcon
                  className="text-secondary absolute top-[-7px] right-[-5px]"
                  onClick={() => handledeleteDate(item?._id)}
                />
                <p
                  onClick={() => handleModal(item?._id)}
                  className="text-secondary text-1xl"
                >
                  {item?.date}
                </p>
                <p
                  onClick={() => handleModal(item?._id)}
                  className="text-secondary text-sm"
                >
                  {item?.month}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <DateModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          itemId={currentId}
          iduser={iduser}
        />
      )}
    </div>
  );
};

export default SetDates;
