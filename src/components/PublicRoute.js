import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    setIsAuthenticated(!token);
  }, [token]);
  return isAuthenticated ? children : navigate("/");
};

export default PublicRoute;
