import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/api/userRoute";
import { singleuser } from "../../services/api/adminRoute";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/redux/slices/userSlice";

const IdUserContext = createContext();

export const useIdUser = () => useContext(IdUserContext);

export const BlockeduserCheck = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (JSON.parse(jwtToken)?.user !== "null" &&isAuthenticated) {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }
  const { data: singleUser } = useQuery({
    queryKey: ["user", iduser],
    queryFn: singleuser,
  });
  const {
    mutate: logoutCurrentUser,
    isError,
    isPaused,
  } = useMutation({
    mutationFn: userLogout,
    onSuccess: (value) => {
      navigate("/login", {
        replace: true,
        state: {
          message: `We regret to inform you that your account has been blocked due to violations of our community guidelines/terms of service. Upon review, it was found that your behavior on our platform has not aligned with the standards we strive to maintain.`,
        },
      });
    },
  });

  if (singleUser?.status === "blocked") {
    if (iduser) {
      dispatch(logoutUser());
      logoutCurrentUser();
    }
  } else {
  }

  return (
    <IdUserContext.Provider value={iduser}>{children}</IdUserContext.Provider>
  );
};
