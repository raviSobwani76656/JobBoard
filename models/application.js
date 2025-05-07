// models/application.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("Application", {
        resume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverletter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",  // Refers to the User model
                key: "id",
            },
        },

        status: {
            type: DataTypes.ENUM("pending", "approved", "denied"),
            defaultValue: "pending"

        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Job",  // Refers to the Job model
                key: "id",
            },
        },
    });

    return Application;
};
