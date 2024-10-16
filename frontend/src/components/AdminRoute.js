import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

function AdminRoute({ children }) {


  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo?.email === 'Perfecttesfa456@gmail.com'? children : <Navigate to="/signin" />;
}

export default AdminRoute;
