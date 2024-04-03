import React from "react";
import { currentUser } from "../../../services/hooks/CuurentUser";
import { doctorSideProfit, singleuser } from "../../../services/api/adminRoute";
import { useQuery } from "@tanstack/react-query";

const AccountBalance = ({ profit }) => {
  let userId = currentUser();
  const { data: admin } = useQuery({
    queryKey: ["user", userId],
    queryFn: singleuser,
  });
  const { data: DoctorProfitGraph } = useQuery({
    queryKey: ["doctor Analaystics"],
    queryFn: doctorSideProfit,
  });

  return (
    <div className="w-[30vw] h-[40vh] bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Total Balance</p>
        <p className="text-lg font-semibold text-green-600">
          ₹ {admin?.accountBalance}
        </p>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">Last Month Balance</p>
          <p className="text-lg font-semibold">
            ₹{" "}
            {DoctorProfitGraph &&
              DoctorProfitGraph[DoctorProfitGraph?.length - 1]?.amount}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Pending Balance</p>
          <p className="text-lg font-semibold">₹0</p>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
