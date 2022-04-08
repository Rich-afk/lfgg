const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Language extends Model {}

Language.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    coding_lang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lang_summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'language',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'language',
  }
);

module.exports = Language;
