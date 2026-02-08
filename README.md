🏥 HealthcareOutlet – Full-Stack E-Commerce Platform

HealthcareOutlet is a full-stack e-commerce web application dedicated to healthcare & parapharmacy products.
It includes a modern client interface, a secure admin dashboard and Stripe payments

🚀 Features
👤 Client Side

Browse healthcare products

Filter products by category

Product details (description, utilisation, caractéristiques)

Add to cart

Secure checkout

Stripe payment integration

Order confirmation

Login / Register system (JWT)

👑 Admin Dashboard

Admin authentication & authorization

View dashboard statistics (users, orders, products)

Add / edit / delete products

View customer orders

View all users

Protected admin routes

💳 Payments

Stripe Checkout integration

Secure online payment

Payment verification before order validation

Order details included (customer, products, total, payment method)

🧱 Tech Stack
Frontend

React

React Router

Axios

Bootstrap / Custom CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Stripe API

📂 Project Structure
HealthcareOutlet/
│
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│
├── Backend/
│ ├── Models/
│ ├── Routes/
│ ├── Middleware/
│ ├── utils/
│ ├── server.js
│ └── .env
│
└── README.md

⚙️ Environment Variables

Create a .env file inside Backend/

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx

                                          👩‍💻 Author

                                          Ameni Abidi
                                       Software Developer
                                  Healthcare E-Commerce Project
