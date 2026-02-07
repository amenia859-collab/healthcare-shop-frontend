import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ cart = [], setCart }) => {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const logout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("authToken");
    setCart([]);
    navigate("/");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <span>🚚 Livraison partout en Tunisie</span>
      </div>

      {/* MAIN HEADER */}
      <header className="header">
        <Link to="/" className="logo">
          ℌ𝔢𝔞𝔩𝔱𝔥ℭ𝔞𝔯𝔢<span>𝔒𝔲𝔱𝔩𝔢𝔱</span>
        </Link>

        {/* ACTIONS */}
        <div className="header-actions">
          <Link to="/">🏠 Accueil</Link>
          {!token && (
            <Link to="/login" className="login-btn">
              Connexion
            </Link>
          )}
          {token && (
            <>
              <Link to="/profile">👤 Profil</Link>
              <Link to="/admin/*">🛠 Dashboard</Link>
              <button className="logout-btn" onClick={logout}>
                Déconnexion
              </button>
            </>
          )}

          <Link to="/cart" className="cart-icon">
            🛒
            {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
