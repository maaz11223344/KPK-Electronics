import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Admin Portal */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/settings" element={<Settings />} />
          {/* Convenience alias: sends anyone hitting /admin/login to the real login page */}
          <Route path="/admin/login" element={<Navigate to="/login" replace />} />

          {/* Main Website */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login mode="register" />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            {/* Catch-all: any unknown URL redirects home instead of rendering nothing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}