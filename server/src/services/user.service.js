const User = require("../models/user.model");

const createUser = async (userData) => {
    return await User.create(userData);
};

const getUsers = async () => {
    return await User.find().select("-password");
};

const getUserById = async (userId) => {
    return await User.findById(userId).select("-password");
};

const updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(
        userId,
        userData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};