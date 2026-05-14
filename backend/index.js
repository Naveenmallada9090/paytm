const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const rootRouter = require("./routes/index");

const app = express();

// CORS: allow localhost (dev) and production frontend (Vercel)
const allowedOrigins = [
  'http://localhost:5173',
  'https://paytm-kd73.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
