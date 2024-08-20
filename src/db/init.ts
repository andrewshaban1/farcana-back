import { Sequelize } from 'sequelize';

import config from '../config/default.config';

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
  }
);

export async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database is istablished successfully');
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
}
