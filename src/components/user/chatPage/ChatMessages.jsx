import React, { useEffect, useState } from "react";
import { singleuser } from "../../../services/api/adminRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, render } from "timeago.js";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { readMessage } from "../../../services/api/userRoute";
import CloseIcon from "@mui/icons-material/Close";
import { deletChat } from "../../../services/api/doctorRoute";
import { useSelector } from "react-redux";

function formateTime(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${period}`;
}

const ChatMessages = ({
  chatsMembers,
  chatId,
  messageLast,
  userId,
  time,
  lastMessage,
  SetCurrentChat,
  currentUser,
  user,
  SetUser,
  sendDataToParent,
}) => {
  const friend = chatsMembers.participants.find((user) => user !== currentUser);
  const { isDoctor, isCalling, callerId } = useSelector(
    (state) => state.doctor
  );

  const queryClient = useQueryClient();
  const { data: singleUser, isLoading } = useQuery({
    queryKey: friend ? ["user", friend] : undefined,
    queryFn: singleuser,
  });

  const sendCuurrentuser = () => {
    return sendDataToParent(singleUser);
  };
  const { mutate: deletChatMuatate } = useMutation({
    mutationFn: deletChat,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["conversation"]);
      }
    },
  });
  useEffect(() => {
    SetUser(singleUser);
    sendCuurrentuser();
  }, [chatsMembers, SetCurrentChat]);

  const handleDeleteChat = () => {
    deletChatMuatate(chatId);
  };

  if (isLoading) {
    return <div></div>;
  }

  if (!singleUser) {
    return null;
  }

  return (
    <>
      <div className=" h-[5rem]  w-[90%]  flex  gap-3 items-center  mx-auto">
        <img
          className="w-12 h-12 object-cover object-top rounded-full"
          src={singleUser?.profilePicture}
          alt=""
        />
        <div className="info flex flex-col relative w-full">
          {isDoctor && (
            <CloseIcon
              className="absolute left-[-38%] top-[-18%] bg-secondary text-white rounded-lg"
              onClick={handleDeleteChat}
              fontSize="2rem"
            />
          )}
          <p className="font-[500] text-sm font-desc subpixel-antialiased  capitalize">
            {" "}
            {singleUser.username.split(" ")[0]}{" "}
          </p>
          <div className="flex  justify-between w-full  ">
            <p className="font-normal    subpixel-antialiased line-clamp-1 text-xs  w-[80px] h-5">
              {lastMessage[lastMessage.length - 1]?.text || messageLast?.text}
            </p>

            {userId !== lastMessage[lastMessage.length - 1]?.sender ? (
              <div className="relative top-[-18px]">
                <p className="text-xs">
                  {formateTime(
                    lastMessage[lastMessage.length - 1]?.time ||
                      messageLast?.time
                  )}
                </p>
                {lastMessage.length > 0 && (
                  <div className="badge bg-secondary text-white badge-sm absolut">
                    {lastMessage.length}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <DoneAllIcon fontSize="1rem" className="relative top-[-5px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
