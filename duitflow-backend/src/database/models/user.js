'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
        }
    }
    User.init({
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(255),
            validate: { isEmail: true }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    });
    return User;
};