import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import axios from "axios";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
import PublicRoute from "./components/PublicRoute";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  // 🔹 FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    axios
      .get("https://healthcare-shop-backend.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item._id === product._id);
      if (found) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <>
      <Header cart={cart} setCart={setCart} />
      <Routes>
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />
        <Route
          path="/details/:id"
          element={<ProductDetails products={products} addToCart={addToCart} />}
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/cart" element={<Cart cart={cart} />} />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
