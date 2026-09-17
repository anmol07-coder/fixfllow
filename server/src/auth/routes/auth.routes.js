const express = require("express");

const authenticate = require("../../middleware/auth.middleware");

const {
  register,
  login,
  getMe,
  refresh,
  logout
} = require("../controllers/auth.controller");

const validate = require("../../middleware/validate.middleware");
const asyncHandler = require("../../utils/asyncHandler");

const {
  registerSchema,
  loginSchema
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

module.exports = router;