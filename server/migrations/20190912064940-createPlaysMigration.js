'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.createTable('Plays', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      player_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: 'Players',
            key: 'id',
            unique: true
          }, 
          onDelete: 'cascade'
      },
      game_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: 'Games',
            key: 'id',
            unique: true 
          }, 
          onDelete: 'cascade'
      },
      cohort_id:{
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model: 'Cohorts',
          key: 'id',
          unique: true 
        }
      },
      playdate:{
          type: Sequelize.DATE
      },
      score:{
          type: Sequelize.DECIMAL(10,0),
          allowNull: false
      },
      total:{
          type: Sequelize.DECIMAL(10,0)
      },
      program:{
          type: Sequelize.STRING(100)
      },
      playstartdate:{
          type: Sequelize.DATE
      },
      program_rank:{
          type: Sequelize.DECIMAL(10,0)
      },
      total_rank:{
          type: Sequelize.DECIMAL(10.0)
      }

  }, 
  {
      freezeTableName: true,
      indexes: [
          {
              unique: true,
              fields: ['player_id', 'game_id','cohort_id','score']
          }
      ]
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
