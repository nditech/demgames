'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cohort_Game = sequelize.define('Cohort_Game', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    game_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Games',
        key: 'id',
        unique: true 
      }
    },
    cohort_id:{
      type: DataTypes.INTEGER,
      allowNull:true,
      references:{
        model: 'Cohorts',
        key: 'id',
        unique: true 
      }
    }
  },
  {
    timestamps: false, 
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['game_id', 'cohort_id']
        }
    ]
  });

  Cohort_Game.associate = function(models) {
    Cohort_Game.belongsTo(models.Games, {foreignKey: 'game_id', as: 'game'})
  };

  Cohort_Game.associate = function(models) {
    Cohort_Game.belongsTo(models.Players, {foreignKey: 'cohort_id', as: 'player'})
  };

  return Cohort_Game;
};