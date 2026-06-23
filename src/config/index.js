import './env.js';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'restaurante_db',
  process.env.POSTGRES_USERNAME || 'postgres',
  process.env.POSTGRES_PASSWORD || '1234',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5433),
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true,
      freezeTableName: true,
    },
  }
);

export default sequelize;
