const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

// @desc Get current user
// @route GET api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user information" });
});

// @desc Register a user
// @route POST api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields must be filled out");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("hashed password: ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User ${user.username} created successfully!`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

// @desc Login user
// @route POST api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});

module.exports = { registerUser, loginUser, currentUser };
