import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <h3>HealthcareOutlet</h3>
          <p>
            Produits de santé & bien-être certifiés. Livraison partout en
            Tunisie. ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ
          </p>
        </div>

        <div>
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cart">Panier</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Catégories</h4>
          <ul>
            <li>Corps</li>
            <li>Visage</li>
            <li>Cheveux</li>
            <li>Bio</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📞 +216 00 000 000</p>
          <p>📧 contact@healthcare.tn</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} HealthcareOutlet — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;
