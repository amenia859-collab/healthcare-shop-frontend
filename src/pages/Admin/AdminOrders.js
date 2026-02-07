import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import "./AdminDashboard.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
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
      .get("https://healthcare-shop-backend.onrender.com/api/orders", headers)
      .then((res) => setOrders(res.data))
      .catch(() => console.log("Orders error"));
  }, [headers]);
  return (
    <>
      <h2>🧾 Orders</h2>

      <table className="products-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>
                {o.delivery?.nom} {o.delivery?.prenom}
              </td>
              <td>{o.delivery?.adresse}</td>
              <td>{o.delivery?.telephone}</td>
              <td>{o.user?.email}</td>
              <td>{o.total} DT</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminOrders;
