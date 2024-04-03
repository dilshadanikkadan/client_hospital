import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { checkApplied } from "../../../services/api/userRoute";

const ServiceApllicationButton = () => {
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (JSON.parse(jwtToken).user !== "null") {
    console.log("entered");
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }

  const { data: checkingApplied } = useQuery({
    queryKey: ["applied", iduser],
    queryFn: checkApplied,
  });
  console.log(checkingApplied);
  return (
    <div className="w-[80%] m-auto flex justify-center">
      {checkingApplied === 1 ? (
        <button className="py-4 px-16 bg-secondary  rounded-lg text-white ">
          Thanks For Your Application
        </button>
      ) : (
        <Link
          to="application_1"
          className="py-4 px-16 bg-secondary  rounded-lg text-white "
        >
          Apply For Service
        </Link>
      )}
    </div>
  );
};

export default ServiceApllicationButton;
