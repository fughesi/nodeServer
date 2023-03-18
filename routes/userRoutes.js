const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { registerUser, loginUser, currentUser, allUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/", allUsers);

router.get("/current", validateToken, currentUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
