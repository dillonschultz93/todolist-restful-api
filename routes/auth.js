const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation } = require('../utils/validation');

// Models
const User = require('../models/User');

// Sign up route
router.post('/signup', async (request, response) => {
  const { error, value } = signupValidation(request);

  // Check if something went wrong during validation.
  if (error) return response.status(400).send(error.details[0].message);

  // Check to see if the email is already in use by another user.
  const userExists = await User.findOne({ email: value.email });

  if (userExists)
    return response.status(400).send('This email is already in use.');

  // Hash the password.
  const salt = await bcrypt.genSalt(16);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  // Create a new user against the schema
  const user = new User({
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });

  try {
    // Save the user to the database
    const savedUser = await user.save();

    response.status(200).send({ user: savedUser._id });
  } catch (error) {
    console.log(error);
    response.status(400).send(error);
  }
});

// Login route
router.post('/login', async (request, response) => {
  const { error, value } = loginValidation(request);
  if (error) return response.status(400).send(error.details[0].message);

  // Check if the user exists
  const user = await User.findOne({ email: value.email });

  if (!user) return response.status(400).send('Email is invalid');

  // Check if the password is valid
  const validPass = await bcrypt.compare(value.password, user.password);

  if (!validPass) return response.status(400).send('Password is invalid');

  // Create and assign a JWT
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });

  response.header('auth-token', token);
  response.status(200);
});

module.exports = router;
