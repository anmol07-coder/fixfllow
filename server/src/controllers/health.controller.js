const checkHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "FixFlow API is running"
    });
};

module.exports = {
    checkHealth
};