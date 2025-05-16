import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
import SearchBar from "./components/SearchBar";

export default function App() {
  const location = useLocation();
  // Only show SearchBar on ProductList
  const showSearchBar = location.pathname === "/";
  return (
    <Layout>
      {showSearchBar && <SearchBar />}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Layout>
  );
}
