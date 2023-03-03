// import { CircularProgress } from "@mui/material";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "./fireContext";

const RequireAuth = () => {

  const context = useLoginContext();
  const location = useLocation();

  if (context.loading) {
    return (
      <div className="loading">
        {/* <CircularProgress/> */}
        <p>Loading...</p>
      </div>
    );
  }

  const tokenLocalStorage = localStorage.getItem("token");

  return tokenLocalStorage ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
