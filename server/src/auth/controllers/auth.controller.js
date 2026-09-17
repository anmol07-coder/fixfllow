const authService = require("../services/auth.service");
const User = require("../../models/user.model");


// ==================== REGISTER ====================

const register = async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  });
};


// ==================== LOGIN ====================

const login = async (req, res) => {
  const {
    user,
    accessToken,
    refreshToken
  } = await authService.loginUser(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      accessToken
    }
  });
};


// ==================== GET CURRENT USER ====================

const getMe = async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};


// ==================== REFRESH TOKEN ====================

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const accessToken =
    await authService.refreshAccessToken(refreshToken);

  res.status(200).json({
    success: true,
    message: "Access token refreshed",
    data: {
      accessToken
    }
  });
};


// ==================== LOGOUT ====================

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
};


// ==================== VERIFY EMAIL ====================

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Verification token is required"
    });
  }

  await authService.verifyEmail(token);

  res.status(200).json({
    success: true,
    message: "Email verified successfully"
  });
};


// ==================== EXPORT ====================

module.exports = {
  register,
  login,
  getMe,
  refresh,
  logout,
  verifyEmail
};