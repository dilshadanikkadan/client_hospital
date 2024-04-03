import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return children;
};
