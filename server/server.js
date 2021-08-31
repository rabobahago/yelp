require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const restaurantsRoutes = require("./routes/restaurants");
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.use("/api/v1/restaurants", restaurantsRoutes);
const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`server is listening, port ${port}`));

module.exports = app;
