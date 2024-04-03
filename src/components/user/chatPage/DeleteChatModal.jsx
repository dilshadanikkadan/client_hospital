import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { deleteEveryOne, deleteForMe } from "../../../services/api/userRoute";

const DeleteChatModal = ({
  setIsOptionOn,
  isOptionOn,
  currentMsId,
  sender,
  userId,
}) => {
  console.log(currentMsId, "this is the delte id ");
  const queryClient = useQueryClient();
  const { mutate: deleteForEveryOneMutate } = useMutation({
    mutationFn: deleteEveryOne,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["allMessages"]);
      }
    },
  });

  const { mutate: deleteForMeMutate } = useMutation({
    mutationFn: deleteForMe,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["allMessages"]);
      }
    },
  });
  const handleDeleteForEveryOne = () => {
    deleteForEveryOneMutate(currentMsId);
    setIsOptionOn(false);
  };

  const handleDleteForMe = () => {
    deleteForMeMutate(currentMsId);
    setIsOptionOn(false);
  };
  return (
    <div>
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  h-24  w-[70%] md:w-[30%] rounded-lg z-50 shadow-md">
          <div className="flex flex-col bg-white rounded-lg">
            <h2 className="text-xl font-bold mt-2  ml-3 ">delete message ? </h2>
            <div className="mb-4 flex items-end flex-col mr-5 cursor-pointer   ">
              {sender === userId && (
                <p
                  className="text-gray-700 mb-2 hover:bg-gray-200 px-2 py-1 rounded-sm"
                  onClick={handleDeleteForEveryOne}
                >
                  delete for everyone
                </p>
              )}
              <p
                className="text-gray-700 mb-2 hover:bg-gray-200 px-2 py-1 rounded-sm"
                onClick={handleDleteForMe}
              >
                delete from me
              </p>
              <p
                className="text-gray-700 mb-2 hover:bg-gray-200 px-2 py-1 rounded-sm"
                onClick={() => setIsOptionOn(false)}
              >
                cancel
              </p>
              <ul></ul>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default DeleteChatModal;
