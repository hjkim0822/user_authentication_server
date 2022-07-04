'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbconfig from '../config/config.js';
import 'dotenv/config';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = dbconfig[env];
const db = {};

const sequelize = new Sequelize(config);

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .map(file => path.join(__dirname, file));

for (let file of modelFiles) {
  // const model = import(file).then(modelModule => {
  //   return modelModule.default(sequelize, Sequelize.DataTypes);
  // });
  const modelModule = await import(file);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
