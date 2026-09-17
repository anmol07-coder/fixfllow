const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      userId
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m"
    }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET
  );
};

const generateEmailVerificationToken = (userId) => {
  return jwt.sign(
    {
      userId,
      purpose: "email-verification"
    },
    process.env.JWT_EMAIL_VERIFY_SECRET,
    {
      expiresIn:
        process.env.JWT_EMAIL_VERIFY_EXPIRES_IN || "15m"
    }
  );
};

const verifyEmailVerificationToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_EMAIL_VERIFY_SECRET
  );
};

const generatePasswordResetToken = (userId) => {
  return jwt.sign(
    {
      userId,
      purpose: "password-reset"
    },
    process.env.JWT_PASSWORD_RESET_SECRET,
    {
      expiresIn:
        process.env.JWT_PASSWORD_RESET_EXPIRES_IN || "15m"
    }
  );
};

const verifyPasswordResetToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_PASSWORD_RESET_SECRET
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken
};