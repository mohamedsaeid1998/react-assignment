import CookieServices from "@/services/cookieServices/CookieServices";
import { Navigate } from "react-router-dom";

interface prop {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: prop) => {
  if (CookieServices.get("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
