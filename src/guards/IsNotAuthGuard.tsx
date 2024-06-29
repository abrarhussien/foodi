import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { IPayload } from "../models/payload.mode";
import useAuth from "../hooks/useAuth";

const IsNotAuthGuard = () => {
  const {auth,setAuth}:any =useAuth()
  const token= localStorage.getItem("token")
  try{  
    const payload: IPayload | null = token ? jwtDecode(token) : null;
    switch (payload?.role.name) {
      case "user":
        return <Navigate to="/" replace />;
      default:
        return <Outlet />;
    }
  }
  catch(err:any){
    if(err.message=="Invalid token specified: missing part #2"){
      setAuth({token:""});
      localStorage.removeItem("token");
      return <Outlet />;

    }
    }




};

export default IsNotAuthGuard;
