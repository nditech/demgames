'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

  
      return queryInterface.createTable('Players', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        firstname:{
            type: Sequelize.STRING(20)
        },
        middlename:{
            type: Sequelize.STRING(20)
        },
        lastname:{
            type: Sequelize.STRING(20)
        },
        username:{
            type: Sequelize.STRING(20),
            allowNull: false
        },
        email:{
            type: Sequelize.STRING(101),
            allowNull: false
        },
        dateofbirth:{
            type: Sequelize.DATE
        },
        gender:{
            type: Sequelize.STRING(6)
        },
        country:{
            type: Sequelize.STRING(35)
        },
        city:{
            type: Sequelize.STRING(35)
        },
        program:{
            type: Sequelize.STRING(100)
        }

    }, 
    {
        freezeTableName: true,
        hooks: {
            afterValidate: (player, options) => {
                console.log('stored procedure working ....');
                console.log(player);
            }
          }
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
