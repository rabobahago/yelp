require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwtGenerator = require("../utils/jwtToken");

exports.getAllRestaurants = async (req, res) => {
  try {
    //const { rows } = await db.query("SELECT * FROM restaurants");

    const { rows } = await db.query(
      "select * from restaurants left join (select restaurant_id, count(*), TRUNC(avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );
    //console.log(dataReview);
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
};

exports.getSingleRestaurant = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select * from restaurants left join (select restaurant_id, count(*), TRUNC(avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1",
      [req.params.id]
    );
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurant: rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
exports.createRestaurant = async (req, res) => {
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
};

exports.updateRestaurant = async (req, res) => {
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
};

exports.deleteRestaurant = async (req, res) => {
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
};

exports.addRestaurantReview = async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    // destructure the req.body(user_name, user_password, user_email)
    const { name, email, password } = req.body;
    const user = await db.query("select * from users where user_email = $1", [
      email,
    ]);
    // check if the user exists, if the user already exists throw error
    if (user.rows.length !== 0) {
      res.status(401).json("user already exists");
    }
    // bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //enter the new user into our database
    const newUser = await db.query(
      "INSERT INTO users (user_email, user_password, user_name) VALUES($1, $2, $3) RETURNING *",
      [email, bcryptPassword, name]
    );
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
};

exports.accessUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.accessDashboard = async (req, res) => {
  try {
    const user = await db.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
