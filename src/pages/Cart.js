import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ cart = [] }) => {
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
  });

  const handleChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /* ================= CONFIRM ORDER ================= */
  const confirmOrder = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");
    if (cart.length === 0) return alert("Cart is empty");

    const orderData = {
      products: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      delivery,
    };

    try {
      await axios.post(
        "https://healthcare-shop-backend.onrender.com/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("✅ Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Order failed");
    }
  };

  /* ================= STRIPE ================= */
  const checkout = async (e) => {
    e.preventDefault(); //

    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");

    const res = await axios.post(
      "https://healthcare-shop-backend.onrender.com/api/payment/checkout",
      { cart },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    window.location.href = res.data.url;
  };


  return (
    <div style={{ padding: "30px" }}>
      <h2>🛒 Mon Panier</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} style={styles.item}>
              <span>{item.name}</span>
              <span>Qté: {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} USD </span>
            </div>
          ))}

          <h3>Total: {total.toFixed(2)} USD </h3>

          <h3>🚚 Informations de livraison</h3>

          <form className="delivery-form">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              onChange={handleChange}
              required
            />

            <button type="button" onClick={confirmOrder}>
              ✅ Confirmer la commande
            </button>

            <button type="button" onClick={checkout} className="checkout-btn">
              💳 Payer avec Stripe
            </button>
          </form>
        </>
      )}
    </div>
  );
};

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
  },
};

export default Cart;
