'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'Tasks',
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