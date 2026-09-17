const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken
} = require("../../utils/jwt");

const {
  sendVerificationEmail,
  sendPasswordResetEmail
} = require("../../utils/email");

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

  const verificationToken =
  generateEmailVerificationToken(
    user._id.toString()
  );

  await sendVerificationEmail(
  user.email,
  verificationToken
  );

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

  if (!user.isEmailVerified) {
    const error = new Error(
      "Please verify your email before logging in"
    );

    error.statusCode = 403;

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

const verifyEmail = async (token) => {
  const decoded = verifyEmailVerificationToken(token);

  const user = await User.findById(decoded.userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.isEmailVerified) {
    return user;
  }

  user.isEmailVerified = true;

  await user.save();

  return user;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const resetToken = generatePasswordResetToken(
    user._id.toString()
  );

  await sendPasswordResetEmail(
    user.email,
    resetToken
  );
};

const resetPassword = async ({
  token,
  password
}) => {
  const decoded =
    verifyPasswordResetToken(token);

  if (
    decoded.purpose !== "password-reset"
  ) {
    const error = new Error(
      "Invalid password reset token"
    );

    error.statusCode = 400;

    throw error;
  }

  const user = await User.findById(
    decoded.userId
  );

  if (!user) {
    const error = new Error(
      "Invalid password reset request"
    );

    error.statusCode = 400;

    throw error;
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  user.password = hashedPassword;

  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  verifyEmail,
  forgotPassword,
  resetPassword
};