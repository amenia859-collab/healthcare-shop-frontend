import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");
  const headers = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    [token],
  );
  useEffect(() => {
    axios
      .get(
        "https://healthcare-shop-backend.onrender.com/api/user/orders",
        headers,
      )
      .then((res) => {
        console.log("ORDERS:", res.data);
        setOrders(res.data);
      })
      .catch(console.log);
  }, [headers]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Mon Profil</h2>
      <h3 className="profile-sub">📦 Mes commandes</h3>

      {orders.length === 0 ? (
        <p>Aucune commande</p>
      ) : (
        <table className="profile-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Adresse</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>{o.total} USD</td>
                <td>{o.delivery?.adresse}</td>
                <td>
                  <span className="status pending">
                    {o.orderStatus || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;
