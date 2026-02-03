import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    axios
      .get(`https://healthcare-shop-backend.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Chargement...</p>;

  return (
    <div className="details-container">
      <div className="details-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="details-info">
        <h1>{product.name}</h1>
        <p className="details-price">{product.price} USD </p>

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

        {/* Tabs */}
        <div className="details-tabs">
          {["description", "caracteristiques", "utilisation"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="details-content">
          {activeTab === "description" && <p>{product.description}</p>}

          {activeTab === "caracteristiques" && (
            <ul>
              {product.caracteristiques?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          )}

          {activeTab === "utilisation" && <p>{product.utilisation}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
