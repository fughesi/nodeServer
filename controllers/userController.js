const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// @desc Get all users
// @route GET api/users
// @access public
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const loggedInUser = await User.findOne({ email });

  if (loggedInUser && (await bcrypt.compare(password, loggedInUser.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: loggedInUser.username,
          email: loggedInUser.email,
          id: loggedInUser.id,
        },
      },
      process.env.JWT,
      { expiresIn: "1m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Incorrect email or password.  Please enter proper credentials");
  }
});

module.exports = { registerUser, loginUser, currentUser, allUsers };
