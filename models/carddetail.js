// models/cardDetail.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardDetail = sequelize.define('CardDetail', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pin_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notifications_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  reissue_requested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'CardDetails',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CardDetail;
