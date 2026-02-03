import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Save token to localStorage
  const saveToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://healthcare-shop-backend.onrender.com/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        saveToken(res.data.data);
        if (res.data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/cart");
        }
        alert("Login successful!");
      })
      .catch(() => {
        alert("Invalid email or password");
      });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Please login to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        {/* PASSWORD WITH TOGGLE */}
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.passwordInput}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eye}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>

        {/* REGISTER LINK */}
        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.registerLink}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f8d7da, #fff)",
  },
  form: {
    background: "#fff",
    padding: "35px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  passwordInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  eye: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#6c131f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  registerLink: {
    color: "#6c131f",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Login;
