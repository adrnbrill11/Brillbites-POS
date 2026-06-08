import { Navigate } from "react-router-dom";
import userAuthStore from "../store/authStore";

export default function ProtectRoutes({ children, adminOnly = false }) {
  const { isLoggedIn, user } = userAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  return children
}
