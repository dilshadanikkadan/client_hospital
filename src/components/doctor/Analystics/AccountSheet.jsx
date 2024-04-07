import React from "react";
import { currentUser } from "../../../services/hooks/CuurentUser";
import { singleuser } from "../../../services/api/adminRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  WithDrawBalance,
  patientsAnalystics,
} from "../../../services/api/doctorRoute";

const AccountSheet = () => {
  let userId = currentUser();
  const queryClient = useQueryClient();
  const { data: doctor } = useQuery({
    queryKey: ["user", userId],
    queryFn: singleuser,
  });
  const { data: userDataAnalstics } = useQuery({
    queryKey: ["patinets Analaystics", userId],
    queryFn: patientsAnalystics,
  });
  const { mutate: withDrawBalanceMutate } = useMutation({
    mutationFn: WithDrawBalance,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });
  const handleWithdraw = () => {
    withDrawBalanceMutate({
      myId: userId,
      amount: doctor?.accountBalance,
    });
  };
  return (
    <div className="w-[70vw] md:w-[30vw]  max-h-[40vh] bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Total Balance</p>
        <p className="text-lg font-semibold text-green-600">
          ₹ {doctor?.accountBalance}
        </p>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">This Month </p>
          <p className="text-lg font-semibold">
            ₹{" "}
            {userDataAnalstics &&
              userDataAnalstics[userDataAnalstics?.length - 1]?.amount}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Pending Balance</p>
          <p className="text-lg font-semibold">₹0</p>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-2">
            are you sure want to Withdraw ₹{doctor?.accountBalance} ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-base-300">Cancel</button>
              <button
                className="btn bg-secondary text-white ml-3"
                onClick={handleWithdraw}
              >
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <button
        className="bg-secondary py-1 px-3 rounded-md text-white mt-1 ml-[70%]"
        onClick={() => {
          document.getElementById("my_modal_5").showModal();
        }}
      >
        WithDraw{" "}
      </button>
    </div>
  );
};

export default AccountSheet;
