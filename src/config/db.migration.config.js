const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: 'postgres',
  },
};
