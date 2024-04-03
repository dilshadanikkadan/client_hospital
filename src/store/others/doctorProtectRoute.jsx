import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DoctorProtectRoute = ({ children }) => {
  const { isDoctor } = useSelector((state) => state.doctor);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isDoctor) {
      navigate("/doctor/login", { replace: true });
    }
  }, [isDoctor]);

  return children;
};
