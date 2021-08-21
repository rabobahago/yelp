require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");
const app = express();
app.use(cors());
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
    const { rows } = await db.query("SELECT * FROM restaurants");
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

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurant: rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "new restaurant successfully created",
      results: rows.length,
      data: {
        restaurants: rows[0],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      status: "restaurant updated successfully",
      results: rows.length,
      data: {
        restaurant: rows[0],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { rows } = await db.query("DELETE FROM restaurants WHERE id=$1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "successfully delete restaurants",
      results: rows.length,
      data: {
        restaurant: rows[0],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`server is listening, port ${port}`));
