import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem("token") && localStorage.getItem("user");

  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;
