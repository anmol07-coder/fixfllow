const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(
    user._id.toString()
  );

  const refreshToken = generateRefreshToken(
    user._id.toString()
  );

  return {
    user,
    accessToken,
    refreshToken
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.statusCode = 401;
    throw error;
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(
    user._id.toString()
  );

  return accessToken;
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken
};