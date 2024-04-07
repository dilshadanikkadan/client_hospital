import React, { useContext, useEffect } from "react";
import { useIdUser } from "../../../store/others/BlockedUserCheck";
import { useQuery } from "@tanstack/react-query";
import { getAllNotification } from "../../../services/api/userRoute";
import { Link } from "react-router-dom";
import { SocketContext } from "../../../store/redux/slices/SocketContext";

const NotificationBox = () => {
  const { sendDataToServer, socket } = useContext(SocketContext);

  const iduser = useIdUser();
  const { data: allNotification, refetch } = useQuery({
    queryKey: ["nitification", iduser],
    queryFn: getAllNotification,
  });
  useEffect(() => {
    if (socket) {
      console.log("Socket:", socket);
      socket.on("notification", (newNotification) => {
        console.log("notification came:", newNotification);
        refetch();
      });
    }
    return () => {
      if (socket) {
        socket.off("notification");
      }
    };
  }, [socket, refetch]);

  return (
    <div className="w-[83%]  m-auto  mt-10 flex flex-col    ">
      <h3 className="font-info font-semibold text-3xl">Notification</h3>
      <div className="div flex w-full flex-col gap-4 mt-4">
        {allNotification?.verification == "true" ? (
          <Link to={`/application/verified`}>
            <div
              role="alert"
              className="alert bg-primary flex justify-between md:inline-grid shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold line-clamp-1 md:line-clamp-5">
                  you have been approved to serve as doctor
                </h3>
                <div className="text-xs">You have 1 unread message</div>
              </div>
              <button className="btn btn-sm">See</button>
            </div>
          </Link>
        ) : (
          console.log(allNotification?.status)
        )}

        {allNotification?.status == "success" ? (
          <Link to={`/payment/recieved`}>
            <div
              role="alert"
              className="alert bg-primary flex justify-between md:inline-grid shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold">Payment Recieved</h3>
                <div className="text-xs">You have 1 unread message</div>
              </div>
              <button className="btn btn-sm">See</button>
            </div>
          </Link>
        ) : (
          console.log(allNotification?.status)
        )}

        {allNotification &&
          [allNotification].map((item, i) => (
            <Link key={i} to={`/notification/${iduser}`}>
              <div
                role="alert"
                className="alert bg-primary flex justify-between md:inline-grid shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <h3 className="font-bold">{item?.subject}</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NotificationBox;
