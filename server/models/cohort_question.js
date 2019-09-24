'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cohort_Question = sequelize.define('Cohort_Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Questions',
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
            fields: ['question_id', 'cohort_id']
        }
    ]
  });
  Cohort_Question.associate = function(models) {
    Cohort_Question.belongsTo(models.Games, {foreignKey: 'question_id', as: 'question'})
  };

  Cohort_Question.associate = function(models) {
    Cohort_Question.belongsTo(models.Games, {foreignKey: 'cohort_id', as: 'cohort'})
  };
  return Cohort_Question;
};