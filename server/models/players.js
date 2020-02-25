module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Players",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING(20)
      },
      middlename: {
        type: DataTypes.STRING(20)
      },
      lastname: {
        type: DataTypes.STRING(20)
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(101),
        allowNull: false
      },
      dateofbirth: {
        type: DataTypes.DATE
      },
      gender: {
        type: DataTypes.STRING(6)
      },
      country: {
        type: DataTypes.STRING(35)
      },
      city: {
        type: DataTypes.STRING(35)
      },
      program: {
        type: DataTypes.STRING(100)
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      hooks: {
        afterCreate: async (player, options) => {
          console.log("stored procedure for players called ....");

          await sequelize.models.Plays.create({
            player_id: player.id,
            game_id: 1,
            cohort_id: 2,
            score: 0,
            total: 0,
            program: player.program,
            program_rank: 0,
            total_rank: 0,
            playstartdate: new Date(),
            playdate: new Date()
          });

          console.log("player successfully registered  ....");
        }
      }
    }
  );
};
