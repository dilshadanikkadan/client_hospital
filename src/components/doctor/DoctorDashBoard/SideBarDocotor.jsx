import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useMutation } from "@tanstack/react-query";
import { logoutDoctor } from "../../../store/redux/slices/DoctorSlice";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../services/api/userRoute";
import MedicationIcon from "@mui/icons-material/Medication";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";

const SideBarDocotor = () => {
  const [hidden, setHidden] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: doctorLogoutMutate } = useMutation({
    mutationFn: userLogout,
    onSuccess: (data) => {
      navigate("/doctor/login", { replace: true });
    },
  });
  const handleLogout = () => {
    doctorLogoutMutate();
    dispatch(logoutDoctor());
  };
  return (
    <>
      <MenuIcon
        className="relative top-3 left-4 md:opacity-0"
        onClick={() => {
          setHidden(0);
          setIsOpen(true);
        }}
      />
      <div
        style={{ transform: `translateX(-${hidden}vw) ` }}
        className={`sidenav md:translate-x-[0] transition-all bg-white duration-700 z-50 h-[100vh] w-[60%] md:w-[20%] flex fixed md:relative`}
      >
        <CloseIcon
          className="absolute top-3 right-4 md:opacity-0"
          onClick={() => {
            setHidden(100);
            setIsOpen(false);
          }}
        />
        <div className="itemsContainer w-[80%] h-[80%]  m-auto mt-[15%]  flex flex-col gap-5 font-info">
          <p>Doctor</p>

          <div className="div flex flex-col gap-5  h-[80%]">
            <NavLink
              to="/doctor"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 100"
                  : "flex items-center gap-3"
              }
            >
              <HomeOutlinedIcon />
              <p>Dashbord</p>
            </NavLink>

            <NavLink
              to="/doctor/patients"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md"
                  : "flex items-center gap-3"
              }
            >
              <QueryBuilderIcon />
              <p>Appointment</p>
            </NavLink>

            <NavLink
              to="/doctor/patientHistory"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md"
                  : "flex items-center gap-3"
              }
            >
              <PersonAddAltOutlinedIcon />
              <p>Patients</p>
            </NavLink>

            {/* <NavLink to="/notifications" className={({ isActive }) => isActive ? "active" : 'flex items-center gap-3'} >
                            <NotificationsNoneOutlinedIcon />
                            <p>Reminder</p>
                        </NavLink> */}
            <NavLink
              onClick={()=> {
                navigate('/doctor/chat')
                window.location.reload()
              }}
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md"
                  : "flex items-center gap-3"
              }
            >
              <ForumIcon />
              <p> Chats</p>
            </NavLink>

            <NavLink
              to="/doctor/setdates"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md"
                  : "flex items-center gap-3"
              }
            >
              <CalendarMonthIcon />
              <p> set Dates</p>
            </NavLink>

            <NavLink
              to="/doctor/prescription"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md"
                  : "flex items-center gap-3"
              }
            >
              <MedicationIcon />
              <p> set Priscription</p>
            </NavLink>
            <NavLink
              to="/doctor/analystics"
              className={({ isActive }) =>
                isActive
                  ? "active flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md"
                  : "flex items-center gap-3"
              }
            >
              <BarChartIcon />
              <p>Analaystics</p>
            </NavLink>
          </div>
          <div
            to="/logout"
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutOutlinedIcon />
            <p className="hidden md:block">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarDocotor;
