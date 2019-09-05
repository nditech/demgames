'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.createTable('Multimedia', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      questionid:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: 'Questions',
            key: 'id',
            unique: true 
          },
          onDelete: 'cascade'
      },
      caption:{
          type: Sequelize.STRING(15)
      },
      content:{
          type: Sequelize.BLOB
      },
      mediadescription:{
          type: Sequelize.STRING(2000)
      },
      keywords:{
          type: Sequelize.STRING(1000)
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
