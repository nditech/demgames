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
<<<<<<< HEAD
    timestamps: false, 
=======
    timestamps: false,
>>>>>>> c2f2b7b6b869f80e18defd786dfe433b6004a914
    freezeTableName: true
  });
  cohort.associate = function(models) {
    // associations can be defined here
  };
  return cohort;
};