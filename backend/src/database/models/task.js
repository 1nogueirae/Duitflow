'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT
    },

    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'done'),
      defaultValue: 'pending',
      allowNull: false
    },

    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    dueTime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Task',

    validate: {
      dueTimeRequiresDate() {
        if (this.dueTime && !this.dueDate) {
          throw new Error('dueTime não pode existir sem dueDate');
        }
      }
    }
  });
  return Task;
};