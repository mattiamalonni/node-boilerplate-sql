import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import database from '../database';

const User = database.define(
  'User',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    root: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    indexes: [{ unique: true, fields: ['id'] }],
    hooks: {
      beforeCreate: user => {
        user.password = bcrypt.hashSync(user.password, 12);
      },
    },
  },
);

User.prototype.isPasswordValid = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
