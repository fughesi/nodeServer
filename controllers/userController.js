const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userValidation } = require("../middleware/reqValidationHandler.js");
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
  res.json(req.user);
});

// @desc Register a user
// @route POST api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = await userValidation.validateAsync(req.body);

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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
  const { email, password } = await userValidation.validateAsync(req.body);

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
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Incorrect email or password.  Please enter proper credentials");
  }
});

module.exports = { registerUser, loginUser, currentUser, allUsers };
