require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();
app.use(express.json());

app.use(morgan("dev"));
//middleware
app.use((req, res, next) => {
  console.log("middleware run");
  next();
});

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const { rows } = await db.query("select * from restaurants");
    console.log(rows);
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurants: rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//get individual restaurant

app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(req);
  res.status(200).json({
    message: "restaurants successfully created",
    data: {
      restaurant: ["mcdonald", "wendy"],
    },
  });
});

//create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req);
  const { name, location, price_range } = req.body;
  res.status(201).json({
    message: "restaurants successfully created",
    data: {
      name,
      location,
      price_range,
    },
  });
});

//update a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  res.status(201).json({
    message: "restaurants successfully created",
    data: {
      restaurants: ["wendy"],
    },
  });
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  res.status(201).json({
    message: "restaurants successfully deleted",
  });
});

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`server is listening, port ${port}`));
