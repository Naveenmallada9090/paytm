const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const rootRouter = require("./routes/index");

const app = express();

// Allow all origins
app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
