const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const rootRouter = require("./routes/index");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
