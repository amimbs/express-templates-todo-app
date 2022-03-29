'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeqTodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeqTodo.init({
    content: DataTypes.TEXT,
    is_completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SeqTodo',
  });
  return SeqTodo;
};