import { useLocation, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setLogout, setUser } from "../store/userSlice";
import { auth } from "../firebase";

function ProtectedRoutes({ children }) {
  const username = useSelector(selectUserName);
  const dispatch = useDispatch();
  let location = useLocation();
  

  console.log(location);

  if (!username) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/Login' state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoutes;
