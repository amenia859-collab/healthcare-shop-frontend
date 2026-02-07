import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });
  const token = localStorage.getItem("authToken");
  const headers = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    [token],
  );

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    axios
      .get(
        "https://healthcare-shop-backend.onrender.com/api/admin/stats",
        headers,
      )
      .then((res) => setStats(res.data))
      .catch(() => console.log("Stats error"));
  }, [headers]);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2>👑 Admin</h2>
        <Link to="/">🏠 Home</Link>
        <Link to="/admin">📊 Dashboard</Link>
        <Link to="/admin/products">📦 Products</Link>
        <Link to="/admin/orders">🧾 Orders</Link>
        <Link to="/admin/users">👤 Users</Link>
      </aside>

      {/* CONTENT */}
      <main className="admin-content">
        <h1>Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">Users: {stats.users}</div>
          <div className="stat-card">Orders: {stats.orders}</div>
          <div className="stat-card">Products: {stats.products}</div>
        </div>

        {/* NESTED ROUTES */}
        <Routes>
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;
