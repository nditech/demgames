module.exports = (sequelize, DataTypes) => {
  const Plays = sequelize.define("Plays", {
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["player_id", "game_id", "cohort_id", "score"]
      }
    ],
    underscored: true
  });

  // Plays.associate = function(models) {
  //     Plays.belongsTo(models.Players, {foreignKey: 'player_id', as: 'player'})
  // };

  // Plays.associate = function(models) {
  //     Plays.belongsTo(models.Games, {foreignKey: 'game_id', as: 'game'})
  // };

  // Plays.associate = function(models) {
  //     Plays.belongsTo(models.Cohorts, {foreignKey: 'cohort_id', as: 'cohort'})
  // };

  return Plays;
};
