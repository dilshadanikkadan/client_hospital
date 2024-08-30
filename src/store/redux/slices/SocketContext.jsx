import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useIdUser } from "../../others/BlockedUserCheck";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");
  if (jwtToken) {
    try {
      if (
        JSON.parse(jwtToken)?.user !== "null" ||
        JSON.parse(jwtToken)?.admin !== "null" ||
        JSON.parse(jwtToken)?.doctor !== "null"
      ) {
        const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

        const userId = decodedToken.id;
        iduser = userId;
      }
    } catch (error) {}
  }

  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [mySocketId, setmySocketId] = useState("");

  useEffect(() => {
    console.log(data);
    // const newSocket = io("https://back-end-hospital-management.onrender.com/",{
    const newSocket = io("https://backendhospitalmanagement-production.up.railway.app/",{
      transports: ['websocket']
    }); 
    setSocket(newSocket);
    newSocket.on("connect", () => {
      newSocket.emit("sendId", { socketId: newSocket.id, _id: iduser });
      setmySocketId(newSocket.id);
      console.log("Socket connected successfully!");
      // setOnlineUsers(prev => [...prev, { socketId: newSocket.id, _id: iduser }]);
    });

    newSocket.on("data", (newData) => {
      console.log(newData);
      setData((prevData) => [...prevData, newData]);
    });

    newSocket?.on("getOnlineUsers", (data) => {
      console.log("onlinbe users", data);
      setOnlineUsers(data);
    });

    return () => {
      newSocket.disconnect();
      console.log("user is disocccted", iduser);
      newSocket.emit("removeUserOnline", { iduser: iduser });
    };
  }, []);

  const sendDataToServer = (newData) => {
    console.log(newData);
    socket.emit("sendData", newData);
  };
  return (
    <SocketContext.Provider
      value={{ socket, data, mySocketId, sendDataToServer, onlineUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
