const express = require("express");

const authenticate = require("../../middleware/auth.middleware");

const {
  register,
  login,
  getMe,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require("../controllers/auth.controller");

const validate = require("../../middleware/validate.middleware");
const asyncHandler = require("../../utils/asyncHandler");

const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} = require("../validators/auth.validators");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(register)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(login)
);

router.get(
  "/me",
  authenticate,
  asyncHandler(getMe)
);

router.post(
  "/refresh",
  asyncHandler(refresh)
);

router.post(
  "/logout",
  asyncHandler(logout)
);

router.get(
  "/verify-email",
  asyncHandler(verifyEmail)
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  asyncHandler(forgotPassword)
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(resetPassword)
);

module.exports = router;