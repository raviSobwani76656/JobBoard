// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");


// const Job = sequelize.define("Job", {

//     // Jobid: {

//     //     type: DataTypes.INTEGER,
//     //     autoIncreament: true,
//     //     primaryKey: true,

//     // },

//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     description: {

//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     slug: {
//         type: DataTypes.STRING,
//         allowNull: false

//     }
// })


// module.exports = { Job };

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
