'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Games', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        caption:{
            type: Sequelize.STRING(200),
            allowNull: false
        },
        gamedescription:{
            type: Sequelize.STRING(200),
            allowNull: false
        },
        gametype:{
            type: Sequelize.STRING(200)
        },
        style:{
          type: Sequelize.STRING(200)
        },
        par_score:{
          type: type.INTEGER
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
