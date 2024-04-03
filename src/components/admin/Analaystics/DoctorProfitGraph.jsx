import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { doctorSideProfit } from "../../../services/api/adminRoute";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
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
const DoctorProfitGraph = ({ setProfit }) => {
  const { data: DoctorProfitGraph } = useQuery({
    queryKey: ["doctor Analaystics"],
    queryFn: doctorSideProfit,
  });
  let doctorDataProfit = DoctorProfitGraph?.map((x, i) => {
    return { ...x, monthCurrent: monthNames[x.month - 1] };
  }).sort((a, b) => a.month - b.month);

  let totalProfit = doctorDataProfit
    ?.map((x) => x.amount)
    .reduce((acc, curr) => (acc += curr));
  useEffect(() => {
    setProfit(totalProfit);
  }, [DoctorProfitGraph]);

  const [doctorData, setUserData] = useState({
    labels: doctorDataProfit?.map((data) => data.monthCurrent),
    datasets: [
      {
        label: "Doctors Analystics",
        data: doctorDataProfit?.map((data) => data.amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div className="w-[75%] ml-16 shadow-md px-2 mt-5 py-2">
      <Line data={doctorData} />
    </div>
  );
};

export default DoctorProfitGraph;
