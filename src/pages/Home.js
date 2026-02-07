import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortOrder, setSortOrder] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const categories = ["Tous", "Corps", "Visage", "Cheveux", "Hommes", "Bio"];

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    fetch("https://healthcare-shop-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // =============== SEARCH ==================
  useEffect(() => {
    const handleStorage = () => {
      setSearch(localStorage.getItem("search") || "");
    };

    window.addEventListener("storage", handleStorage);
    handleStorage();

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ================= SLIDER =================
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  // ================= FILTER =================
  let filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // ================= SORT BY PRICE =================
  if (sortOrder === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (products.length === 0) {
    return <p style={{ textAlign: "center" }}>Chargement...</p>;
  }

  return (
    <div>
      {/* ================= HERO ================= */}
      <div className="hero-container">
        <div className="hero-left">
          <div
            className="hero-slide"
            style={{
              backgroundImage: `url(${products[currentSlide]?.imageUrl})`,
            }}
          />
        </div>

        <div className="hero-right">
          <h1>HealthcareOutlet</h1>
          <p>
            Votre boutique en ligne de produits de santé et de beauté en
            Tunisie.
          </p>
          <ul>
            <li>✔ Produits certifiés</li>
            <li>✔ Livraison rapide</li>
            <li>✔ Prix compétitifs</li>
            <li>✔ Service client 24/7</li>
          </ul>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="categories-bar">
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Trier par prix</option>
          <option value="low">Prix croissant</option>
          <option value="high">Prix décroissant</option>
        </select>
      </div>

      {/* ================= PROMO SECTION ================= */}
      <h2 className="section-title">🔥 Promotions</h2>

      <div className="promo-grid">
        {products
          .filter((p) => p.price <= 30)
          .slice(0, 4)
          .map((product) => (
            <div className="promo-card" key={product._id}>
              <span className="promo-badge">PROMO</span>

              <img src={product.imageUrl} alt={product.name} />

              <h3>{product.name}</h3>

              <p className="promo-price">{product.price} USD</p>

              <button
                className="add-to-cart-btn"
                onClick={() => {
                  const token = localStorage.getItem("authToken");

                  if (!token) {
                    navigate("/login");
                  } else {
                    addToCart(product);
                  }
                }}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
      </div>

      {/* ================= ALL PRODUCTS ================= */}
      <h2 className="products-title">Nos Produits</h2>
      <ProductList products={filteredProducts} />
      <h2 className="section-title">💎 Pourquoi nous choisir ?</h2>

      <div className="why-grid">
        <div className="why-card">
          🚚
          <h3>Livraison rapide</h3>
          <p>Partout en Tunisie sous 24/48h</p>
        </div>

        <div className="why-card">
          🧪
          <h3>Produits certifiés</h3>
          <p>Approuvés par des professionnels</p>
        </div>

        <div className="why-card">
          💳
          <h3>Paiement sécurisé</h3>
          <p>Stripe & paiement à la livraison</p>
        </div>

        <div className="why-card">
          📞
          <h3>Support client</h3>
          <p>Disponible 7j/7</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
