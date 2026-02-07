import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import "./AdminDashboard.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

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
        "https://healthcare-shop-backend.onrender.com/api/admin/users",
        headers,
      )
      .then((res) => setUsers(res.data))
      .catch(() => console.log("Users error"));
  }, [headers]);
  return (
    <>
      <h2>👤 Users</h2>

      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default AdminUsers;
