

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("Job", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Job;
};
