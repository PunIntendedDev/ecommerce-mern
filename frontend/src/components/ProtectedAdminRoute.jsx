import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  if (!isAdmin) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

export default ProtectedAdminRoute;