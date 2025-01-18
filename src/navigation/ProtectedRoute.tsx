import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

function ProtectedRoute({ children, requiredRole }: any) {
  const authToken = cookie.get("token");
  const user = cookie.get("userData");

  if (!authToken || !user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
