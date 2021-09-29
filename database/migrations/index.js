import fs from 'fs';
import { DataTypes } from 'sequelize';
import database from '../index';
import models from '../../models';
import logger from '../../utils/logger';

const setup = async () => {
  const qi = database.getQueryInterface();
  const tables = await qi.showAllTables();

  if (tables.includes('migrations')) {
    logger.info('Migration table already exist, skipping.');
  } else {
    logger.info('Migration table does not exist, creating.');
    await qi.createTable('migrations', {
      value: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  }

  const lastMigration = await models.Migration.findOne();
  if (!lastMigration) {
    await models.Migration.create({ value: 0 });
  }
};

const execute = async () => {
  const lastMigration = await models.Migration.findOne();

  const files = await fs.promises.readdir(__dirname);
  const migrations = files
    .map(file => file.replace(/\.[^/.]+$/, ''))
    .filter(file => file !== 'index')
    .sort();

  for (const migration of migrations) {
    if (lastMigration.value < migration) {
      logger.info(`Performig migration: ${migration}.`);

      const ret = await require(`./${migration}.js`).default();
      if (!ret) {
        await lastMigration.update({ value: parseInt(migration) });
      }
    }
  }
};

export default {
  setup,
  execute,
};
