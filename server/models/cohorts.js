'use strict';
module.exports = (sequelize, DataTypes) => {
  const cohort = sequelize.define('Cohorts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, 
  {
    timestamps: false, 
    freezeTableName: true
  });
  cohort.associate = function(models) {
    // associations can be defined here
  };
  return cohort;
};