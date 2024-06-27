import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { IPayload } from "../models/payload.mode";


const IsAuthGuard = ({ role }: { role: string | null }) => {
  const token= localStorage.getItem("token");
   const payload: IPayload | null = token ? jwtDecode(token) : null;

  if (payload?.role.name === role) {
    return <Outlet />;
  }

  switch (payload?.role.name) {
    default:
      return <Navigate to="/login" replace />;
  }
};

export default IsAuthGuard;
