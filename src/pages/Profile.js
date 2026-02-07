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
        "http://healthcare-shop-backend.onrender.com/api/user/orders",
        headers,
      )
      .then((res) => setOrders(res.data))
      .catch(console.log);
  }, [headers]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>👤 Mon Profil</h2>
      <h3>📦 Mes commandes</h3>

      {orders.length === 0 ? (
        <p>Aucune commande</p>
      ) : (
        <table style={table}>
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
                <td>{o.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default Profile;
