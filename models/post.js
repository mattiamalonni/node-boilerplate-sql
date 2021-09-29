import { Sequelize, DataTypes } from 'sequelize';
import database from '../database';

const Post = database.define(
  'Post',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'posts',
    timestamps: true,
    indexes: [{ unique: true, fields: ['id'] }],
  },
);

export default Post;
