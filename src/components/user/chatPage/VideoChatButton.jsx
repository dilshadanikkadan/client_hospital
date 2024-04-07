import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CallVideoCall } from "../../../store/redux/slices/DoctorSlice";
import { SocketContext } from "../../../store/redux/slices/SocketContext";
const VideoChatButton = ({ username, recieverId }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { sendDataToServer, socket, onlineUsers } = useContext(SocketContext);

  const { isDoctor, isCalling } = useSelector((state) => state.doctor);
  const [calling, setCalling] = useState(false);
  const navigate = useNavigate();
  console.log("iam hey dilu", recieverId);
  useEffect(() => {
    if (socket) {
      socket.on("recieveCall", (data) => {
        setCalling(true);
      });
    }
  }, [socket]);

  return (
    <div>
      {isDoctor ? (
        <button
          onClick={() => {
            !isAuthenticated
              ? navigate("/doctor/chat/videoCall", { state: recieverId })
              : navigate("/chat_doctors/videoCall", { state: recieverId });
            dispatch(CallVideoCall());
          }}
          className="py-1 px-7 bg-secondary rounded-lg text-white"
        >
           Call
        </button>
      ) : (
        ""
      )}
      {calling &&
        !isDoctor &&
        navigate("/chat_doctors/videoCall", { state: recieverId })}
    </div>
  );
};

export default VideoChatButton;
