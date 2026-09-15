const express = require("express");
const { register } = require("../controllers/auth.controller");
const validate = require("../../middleware/validate.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const { registerSchema } = require("../validators/auth.validators");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(register)
);

module.exports = router;