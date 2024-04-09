import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatIcon from "@mui/icons-material/Chat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/redux/slices/userSlice";
import {
  getAllNotification,
  userLogout,
  viewAppointment,
} from "../../../services/api/userRoute";
import PersonIcon from "@mui/icons-material/Person";
import { SocketContext } from "../../../store/redux/slices/SocketContext";

const Navbar = () => {
  const { sendDataToServer, socket } = useContext(SocketContext);
  const [iseOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (JSON.parse(jwtToken)?.user !== "null" && isAuthenticated) {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }
  const { data: allNotification, refetch } = useQuery({
    queryKey: ["nitification", iduser],
    queryFn: getAllNotification,
  });
  console.log(allNotification);
  const { data: myAppointment } = useQuery({
    queryKey: ["appointment", iduser],
    queryFn: viewAppointment,
  });

  const { mutate, isError, isPaused } = useMutation({
    mutationFn: userLogout,
    onSuccess: (value) => {
      navigate("/", { replace: true });
    },
  });
  const handleLogout = async () => {
    mutate();
    dispatch(logoutUser());
  };
  const handleChatTest = () => {
    sendDataToServer({ message: "Hello, server!" });
    socket.on("getThisMsg", (data) => {
      console.log(data);
    });
  };

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
    <>
      <div className="navabar w-full overflow-hidden  z-50 bg-white  border-[1px] border-b-gray-100 md:h-24 pb-5 md:pb-0 ">
        <div className="navItems w-[84%] over h-full m-auto flex  flex-col md:flex-row  md:items-center">
          <div className="left flex-[6] flex justify-between mt-5">
            {/* <h3 className="logo md:text-2xl lg:text-3xl mr-2 font-logo font-bold text-info ">
              E-CARE
            </h3> */}
            <img className="h-12" src="/images/bgLogo.png" alt="" />
            <div></div>

            <img
              onClick={() => setIsOpen(!iseOpen)}
              className="h-10 w-10  md:w-14 md:h-14 md:hidden"
              src="https://naziya-hospital.netlify.app/assets/img/icons/menu.png"
              alt=""
            />
          </div>

          <div
            className={`right transition-all duration-300   ${
              !iseOpen ? "hidden" : "gap-3"
            }  flex-[7] flex flex-col  md:flex md:flex-row  md:items-center  md:gap-4 lg:gap-10 mt-5`}
          >
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active text-xl text-secondary"
                  : "text-xl text text-[#9095A1]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isActive
                  ? "active  text-xl text-secondary "
                  : "text-xl text text-[#9095A1]"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                isActive
                  ? "active  text-xl text-secondary "
                  : "text-xl text text-[#9095A1]"
              }
            >
              Service
            </NavLink>
            <NavLink
              to="/Ourdoctors"
              className={({ isActive }) =>
                isActive
                  ? "active  text-xl text-secondary "
                  : "text-xl text text-[#9095A1]"
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "active  text-xl text-secondary "
                  : "text-xl text text-[#9095A1]"
              }
            >
              Contact
            </NavLink>
            {isAuthenticated ? (
              <div className="flex gap-20 pb-5 h-full items-center cursor-pointer md:gap-5 md:pb-0">
                <img
                  onClick={() => navigate("/profile")}
                  className="w-12 h-12 object-cover"
                  src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                  alt=""
                />
                <div
                  onClick={() => navigate("/notification")}
                  className="relative"
                >
                  <NotificationsNoneIcon
                    onClick={() => navigate("/notification")}
                  />
                  {allNotification?.verification == "true" ? (
                    <span className="absolute text-xs top-[-4px] right-[2px] py-[1px] rounded-full  px-[2px] bg-red-500 text-white">
                      3
                    </span>
                  ) : myAppointment?.status == "approved" ? (
                    <span className="absolute text-xs top-[-4px] right-[2px] py-[1px] rounded-full  px-[2px] bg-red-500 text-white">
                      {[myAppointment].length}
                    </span>
                  ) : (
                    <span className="absolute text-xs top-[-4px] right-[2px] py-[1px] rounded-full  px-[2px] bg-red-500 text-white">
                      {allNotification?.status === "success"
                        ? 2
                        : allNotification !== undefined &&
                          allNotification !== null
                        ? [allNotification].filter((item) => item !== null)
                            .length
                        : 0}
                    </span>
                  )}
                </div>
                <ChatIcon
                  onClick={() => {
                    navigate("/chat_doctors");
                    window.location.reload();
                  }}
                />
                <LogoutIcon
                  onClick={handleLogout}
                  className="text-blue-950 hover:text-red-700 text-3xl"
                />
              </div>
            ) : (
              <div className="flex gap-5 h-full items-center cursor-pointer">
                <button
                  className="bg-secondary text-white py-1 px-3 md:px-5 md:py-3"
                  onClick={() => navigate("/makeAppointment")}
                >
                  Appointment
                </button>
                <div
                  className="div flex gap-2  bg-primary py-1 px-3 md:px-5 md:py-3 "
                  onClick={() => navigate("/login")}
                >
                  <PersonIcon />
                  <p>Login</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
