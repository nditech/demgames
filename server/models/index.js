'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

db.Questions.belongsTo(db.Games, {foreignKey: 'game_id'});
db.Games.hasMany(db.Questions, {referenceKey: 'game_id'});
db.Questions.hasMany(db.Choices, {foreignKey: 'questionid'});
db.Choices.belongsTo(db.Questions, {referenceKey: 'questionid'});
db.Plays.belongsTo(db.Players, {foreignKey: 'player_id'});
db.Players.hasMany(db.Plays, {referenceKey: 'player_id'});
db.Plays.belongsTo(db.Games, {referenceKey: 'game_id'});
db.Plays.belongsTo(db.Cohorts, {referenceKey: 'id'});
db.Games.hasOne(db.Cohort_Game, {foreignKey: 'game_id'});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
