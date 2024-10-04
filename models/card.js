// models/card.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CardDetail = require('./cardDetail');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  card_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cardholder_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiry_date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, {
  tableName: 'Cards',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relasi one-to-one dengan CardDetail
Card.hasOne(CardDetail, { foreignKey: 'card_id', as: 'detail' });
CardDetail.belongsTo(Card, { foreignKey: 'card_id' });

module.exports = Card;
