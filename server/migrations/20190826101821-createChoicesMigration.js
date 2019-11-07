'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.createTable('Choices', {
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        questionid:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references:{
              model: 'Questions',
              key: 'id',
            },
            onDelete: 'cascade'
        },
        choicestatement:{
            type: Sequelize.STRING(300)
        },
        choicedescription:{
            type: Sequelize.STRING(2000)
        },
        weight:{
            type: Sequelize.FLOAT(2)
        },
        answer:{
            type: Sequelize.INTEGER
        },
        linked_question:{
          type : Sequelize.INTEGER
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
