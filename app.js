const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/user");
const applicationRoutes = require("./routes/Application");
const jobRoutes = require("./routes/Job");

const app = express();
const PORT = 4080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const User = db.User; // If you need access to User model

app.use("/application", applicationRoutes);
app.use("/user", userRoutes);
app.use("/job", jobRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the API");
});

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


