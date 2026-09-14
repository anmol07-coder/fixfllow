const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");

const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json({
        success: true,
        data: safeUser
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getUsers();

    res.status(200).json({
        success: true,
        data: users
    });
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(
        req.params.id,
        req.body
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};