import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../redux/slices/SocketContext";

export const CallStateRoute = ({ children }) => {
  const { isDoctor, isCalling, callerId } = useSelector(
    (state) => state.doctor
  );
  const { sendDataToServer, socket, onlineUsers } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.on("recieveCall", (data) => {
        navigate("/chat_doctors/videoCall", { state: callerId });
      });
    }
  }, [isCalling, socket]);

  return children;
};
