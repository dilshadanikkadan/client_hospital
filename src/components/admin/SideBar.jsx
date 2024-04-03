import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../../services/api/userRoute";
import { logoutAdmin } from "../../store/redux/slices/AdminSlice";
import { useDispatch } from "react-redux";
import BarChartIcon from "@mui/icons-material/BarChart";
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: adminLogoutMutate } = useMutation({
    mutationFn: userLogout,
    onSuccess: (data) => {
      navigate("/admin/login", { replace: true });
    },
  });
  const handleLogout = () => {
    adminLogoutMutate();
    dispatch(logoutAdmin());
  };
  return (
    <>
      <div className="sidenav h-[100vh] w-[20%] flex ">
        <div className="itemsContainer w-[80%] h-[80%]  m-auto mt-[15%]  flex flex-col gap-5 font-info">
          <p>Admin</p>

          <div className="div flex flex-col gap-5  h-[80%]">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 100 "
                  : "flex items-center gap-3"
              }
            >
              <HomeOutlinedIcon />
              <p>Dashbord</p>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md shadow-lg"
                  : "flex items-center gap-3"
              }
            >
              <PeopleOutlineOutlinedIcon />
              <p>Users</p>
            </NavLink>

            <NavLink
              to="/admin/pending_doctorRequests"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md shadow-lg"
                  : "flex items-center gap-3"
              }
            >
              <PersonAddAltOutlinedIcon />
              <p>Doctors</p>
            </NavLink>

            <NavLink
              to="/admin/banner"
              className={({ isActive }) =>
                isActive
                  ? "active flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md shadow-lg "
                  : "flex items-center gap-3"
              }
            >
              <AddBusinessOutlinedIcon />
              <p>Banner</p>
            </NavLink>

            <NavLink
              to="/admin/specialities"
              className={({ isActive }) =>
                isActive
                  ? "active  flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md shadow-lg"
                  : "flex items-center gap-3"
              }
            >
              <PaymentOutlinedIcon />
              <p>Specialities</p>
            </NavLink>

            <NavLink
              to="/admin/license"
              className={({ isActive }) =>
                isActive
                  ? "active flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md shadow-lg"
                  : "flex items-center gap-3"
              }
            >
              <CreditScoreIcon />
              <p>License</p>
            </NavLink>

            <NavLink
              to="/admin/analystics"
              className={({ isActive }) =>
                isActive
                  ? "active flex items-center gap-3 bg-slate-100 py-1 pl-1 rounded-md shadow-lg transition-all duration-1000 "
                  : "flex items-center gap-3"
              }
            >
              <BarChartIcon />
              <p>Analaystics</p>
            </NavLink>
          </div>
          <div
            onClick={handleLogout}
            to="/logout"
            className="flex items-center gap-3 cursor-pointer"
          >
            <LogoutOutlinedIcon />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
