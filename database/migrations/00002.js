import { DataTypes } from 'sequelize';
import db from '../../database';

export default async () => {
  const qi = db.getQueryInterface();
  await qi.createTable('posts', {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  await qi.addIndex('posts', ['id']);
};
