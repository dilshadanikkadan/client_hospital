import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DoctorProtectLoginRoute = ({ children }) => {
  const { isDoctor } = useSelector((state) => state.doctor);

  const navigate = useNavigate();

  useEffect(() => {
    if (isDoctor) {
      navigate("/doctor", { replace: true });
    }
  }, [isDoctor]);

  return children;
};
