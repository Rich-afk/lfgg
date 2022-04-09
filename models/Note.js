const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model { }

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    filename: {
      type: DataTypes.STRING,
    },
    original_poster: {
      type: DataTypes.STRING,
    },
    language_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'language',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'note',
  }
);

module.exports = Note;
