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
  const handleReclamationChange = (e) => {
    setReclamation({ ...reclamation, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [reclamation, setReclamation] = useState({
    subject: "",
    message: "",
  });

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
      "https://healthcare-shop-backend.onrender.com//api/payment/checkout",
      { cart },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    window.location.href = res.data.url;
  };

  /* ================= RECLAMATION ================= */
  const sendReclamation = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");

    if (!reclamation.message) {
      return alert("Please describe your problem");
    }

    try {
      await axios.post(
        "https://healthcare-shop-backend.onrender.com//api/reclamations",
        reclamation,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("📩 Reclamation sent successfully");
      setReclamation({ subject: "", message: "" });
    } catch (err) {
      alert("❌ Failed to send reclamation");
    }
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
      <hr />
      <div className="reclamation-box">
        <h3>⚠️ Un problème ? Envoyer une réclamation</h3>

        <input
          type="text"
          name="subject"
          placeholder="Sujet (ex: problème de paiement)"
          value={reclamation.subject}
          onChange={handleReclamationChange}
        />

        <textarea
          name="message"
          placeholder="Décrivez votre problème..."
          rows={4}
          value={reclamation.message}
          onChange={handleReclamationChange}
        />

        <button type="button" onClick={sendReclamation}>
          📩 Envoyer la réclamation
        </button>
      </div>
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
