import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AdminLoginProtectRoute = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.admin);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAdmin]);

  return children;
};
