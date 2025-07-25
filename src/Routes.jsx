import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomeDashboard from "pages/home-dashboard";
import ConnectionNetworkTree from "pages/connection-network-tree";
import BlogDetailView from "pages/blog-detail-view";
import ProductsShowcase from "pages/products-showcase";
import IdeasWhiteboard from "pages/ideas-whiteboard";
import NotFound from "pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GoogleSearch from "./pages/GoogleSearch";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/connection-network-tree" element={<ConnectionNetworkTree />} />
        <Route path="/blog-detail-view" element={<BlogDetailView />} />
        <Route path="/products-showcase" element={<ProductsShowcase />} />
        <Route path="/ideas-whiteboard" element={<IdeasWhiteboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<GoogleSearch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;