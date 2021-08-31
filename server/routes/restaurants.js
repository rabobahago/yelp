const express = require("express");
const router = express.Router();
require("dotenv").config();
const validator = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
const restaurantCtrl = require("../controllers/restaurants");

router.get("/", restaurantCtrl.getAllRestaurants);
router.post("/", restaurantCtrl.createRestaurant);
router.get("/:id", restaurantCtrl.getSingleRestaurant);
router.put("/:id", restaurantCtrl.updateRestaurant);
router.delete("/:id", restaurantCtrl.deleteRestaurant);
router.post("/:id/addReview", restaurantCtrl.addRestaurantReview);
router.post("/auth/register", validator, restaurantCtrl.createUser);
router.post("/auth/login", validator, restaurantCtrl.accessUser);
router.get("/auth/dashboard", authorization, restaurantCtrl.accessDashboard);

module.exports = router;
