const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const School = sequelize.define('School', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: "school_db",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['name', 'address']  
    }
  ]
});

module.exports = School;
