# Paytm Clone

A full-stack payment application clone implementing user authentication and money transfers between accounts.

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: CORS middleware

### Frontend
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 🛠️ Features

- **User Management**:
  - User signup and sign-in with JWT authentication.
  - User profile updates.
  - User search (bulk search by name).
- **Account Services**:
  - Account creation upon signup (default balance: 10,000).
  - Real-time balance checking.
  - Secure money transfers between users using MongoDB transactions for atomicity.

## 📁 Project Structure

```text
.
 backend/
│   ├── routes/          # API endpoints (User & Account)
│   ├── db.js            # Database models and connection
│   ├── middleware.js    # Authentication middleware
│   ├── config.js       # Environment configuration
│   └── index.js         # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── pages/       # Application pages (e.g., SendMoney.jsx)
│   │   └── ...          # Components and styles
│   └── package.json     # Frontend dependencies and scripts
└── Dockerfile           # Containerization configuration
```

## 🚦 Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
   The server will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### User Endpoints (`/api/v1/user`)
- `POST /signup`: Create a new user account.
- `POST /signin`: Authenticate user and receive JWT.
- `PUT /`: Update user profile (Requires Auth).
- `GET /bulk`: la Search for users by name.

### Account Endpoints (`/api/v1/account`)
- `GET /balance`: Get the current user's balance (Requires Auth).
- `POST /transfer`: Transfer money to another user (Requires Auth).

## 🔒 Security
- All sensitive account operations are protected by `authMiddleware`, which validates the JWT in the request headers.
- Money transfers utilize MongoDB sessions and transactions to ensure that either both the sender's balance is deducted and the receiver's is increased, or neither happens.
