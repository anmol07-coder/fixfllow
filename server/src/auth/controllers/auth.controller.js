const authService = require("../services/auth.service");

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

const login = async (req, res) => {
  const user = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

module.exports = {
  register,
  login
};