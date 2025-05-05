import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/login";
import Layout from "@/layout";
import { jwtDecode } from "jwt-decode";
import { getItem, removeItem } from "@/utils/local_storage";
import { toast } from "sonner";
import { clearCredentials } from "@/redux/admin/adminSlice";
import { useDispatch } from "react-redux";
import Dashboard from "@/pages/dashboard";
import ErrorPage from "@/components/errors/404";
import CustomerList from "@/pages/customer_list";

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
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
          <Layout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<CustomerList />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
};

export default Router;  
