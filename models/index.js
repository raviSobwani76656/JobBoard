const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Your DB config

const db = {};

// Load all model files and initialize them
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations after all models are loaded
const { User, Application, Job } = db;

User.hasMany(Application, { foreignKey: 'userId', as: 'applications', });
Application.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
