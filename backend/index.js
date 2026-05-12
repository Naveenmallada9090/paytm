const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const rootRouter = require("./routes/index");

const app = express();

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: true, // Reflect the request origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
