const express = require("express");

const healthRoutes = require("./routes/health.routes");
const userRoutes = require("./routes/user.routes");

const errorHandler = require("./middleware/error.middleware");
const notFound = require("./middleware/notFound.middleware");

const authRoutes = require("./auth/routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;