import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { patientsAnalystics } from "../../../services/api/doctorRoute";
import { currentUser } from "../../../services/hooks/CuurentUser";
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

const PatientGraph = () => {
  const myId = currentUser();
  const { data: userDataAnalstics } = useQuery({
    queryKey: ["patinets Analaystics", myId],
    queryFn: patientsAnalystics,
  });
  console.log("userDataAnalstics", userDataAnalstics);
  let userDataAnalysed = userDataAnalstics
    ?.map((x, i) => {
      return { ...x, monthCurrent: monthNames[x.month - 1] };
    })
    .sort((a, b) => a.month - b.month);
  const [userData, setUserData] = useState({
    labels: userDataAnalysed?.map((data) => data.monthCurrent),
    datasets: [
      {
        label: "Patients Analystics",
        data: userDataAnalysed?.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          // "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div>
      <div className="w-[75%] mt-10 ml-16 shadow-md px-2">
        <Bar data={userData} />
      </div>
    </div>
  );
};

export default PatientGraph;
