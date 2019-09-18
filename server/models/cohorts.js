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
  }, {});
  cohort.associate = function(models) {
    // associations can be defined here
  };
  return cohort;
};