const express = require("express");

const {
  register,
  login
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

module.exports = router;