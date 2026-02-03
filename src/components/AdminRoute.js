// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) return <Navigate to="/login" />;

  const decoded = JSON.parse(atob(token.split(".")[1]));

  return decoded.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
