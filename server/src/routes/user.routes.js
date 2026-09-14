const express = require("express");

const validate = require("../middleware/validate.middleware");

const {
    createUserSchema,
    updateUserSchema
} = require("../validators/user.validator");

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

module.exports = router;