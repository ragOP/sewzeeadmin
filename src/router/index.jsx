import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/login";
import { jwtDecode } from "jwt-decode";
import { getItem, removeItem } from "@/utils/local_storage";
import { toast } from "sonner";
import { clearCredentials } from "@/redux/admin/adminSlice";
import { useDispatch } from "react-redux";

const Router = () => {
  const dispatch = useDispatch();

  const checkTokenExpiration = () => {
    const token = getItem("token");
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        removeItem("token");
        dispatch(clearCredentials());
        toast.error("Your session has expired. Please login again.", {
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      removeItem("token");
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
};

export default Router;  
