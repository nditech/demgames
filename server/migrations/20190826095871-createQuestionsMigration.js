'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      game_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: 'Games',
            key: 'id'
          },
          onDelete: 'cascade'
      },
      difficulty_level:{
          type: Sequelize.INTEGER
      },
      question_statement:{
          type: Sequelize.STRING(300),
          allowNull: false
      },
      weight:{
          type: Sequelize.FLOAT(2)
      },
      explanation:{
          type: Sequelize.STRING(3000)
      },
      isitmedia:{
          type: Sequelize.INTEGER
      }
  }, 
  {
      freezeTableName: true
  });
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
