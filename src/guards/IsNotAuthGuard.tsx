import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { IPayload } from "../models/payload.mode";

const IsNotAuthGuard = () => {

  const token= localStorage.getItem("token")
  const payload: IPayload | null = token ? jwtDecode(token) : null;



  switch (payload?.role.name) {
    case "user":
      return <Navigate to="/" replace />;
    default:
      return <Outlet />;
  }
};

export default IsNotAuthGuard;
