import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/login";
import Layout from "@/layout";
import { jwtDecode } from "jwt-decode";
import { getItem, removeItem } from "@/utils/local_storage";
import ProtectedRoute from "@/auth/ProtectedRoute";
import PublicRoute from "@/auth/PublicRoute";
import { toast } from "sonner";
import { clearCredentials } from "@/redux/admin/adminSlice";
import { useDispatch } from "react-redux";
import Dashboard from "@/pages/dashboard";
import ErrorPage from "@/components/errors/404";
import CustomerList from "@/pages/customer_list";
import CustomerDetails from "@/pages/customer_list/page/customer_details";
import SellerList from "@/pages/seller_list";
import SellerPosts from "@/pages/seller_list/pages/seller_posts";
import AllProducts from "@/pages/all_products";
import ProductDetails from "@/pages/all_products/pages/product_details";
import AddThumbnail from "@/pages/add_thumbnail";
import AddBanner from "@/pages/add_banner";
import AddCategory from "@/pages/add_category";
import SendNotification from "@/pages/send_notification";
import SellerDetails from "@/pages/seller_list/pages/seller_details";

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
      {/* Default redirect to /dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="customer_list" element={<CustomerList />} />
          <Route path="customer_list/details/:id" element={<CustomerDetails />} />

          <Route path="seller_list" element={<SellerList />} />
          <Route path="seller_list/posts/:id" element={<SellerPosts />} />
          <Route path="seller_list/details/:id" element={<SellerDetails />} />

          <Route path="products" element={<AllProducts />} />
          <Route path="products/details/:id" element={<ProductDetails />} />

          <Route path="add_thumbnail" element={<AddThumbnail />} />
          <Route path="add_banner" element={<AddBanner />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="send_notification" element={<SendNotification />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
