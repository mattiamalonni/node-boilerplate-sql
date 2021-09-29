import { DataTypes } from 'sequelize';
import database from '../database';

const Migration = database.define(
  'Migration',
  {
    value: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'migrations',
    timestamps: true,
  },
);

Migration.removeAttribute('id');

export default Migration;
