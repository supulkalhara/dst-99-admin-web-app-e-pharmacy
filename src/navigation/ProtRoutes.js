import React from 'react';
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = (myUser) => {
  return (myUser && myUser.loggedIn) 
};

const ProtectedRoutes = () => {
  var myUser=[];
  const LOCAL_STORAGE_KEY = "userlog";
  const User_details = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const location = useLocation();
  // json.parse(string) -> all string convert to an object 
  if (User_details){
    myUser = User_details;
  }else{
    console.log("Local storage has not your loging details");
  }
  const isAuth = useAuth(myUser);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );

}

export default ProtectedRoutes;