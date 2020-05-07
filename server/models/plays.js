module.exports = (sequelize, DataTypes) => {
    const Plays = sequelize.define('Plays', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'Players', 
            referencesKey: 'id',
            onDelete: 'cascade'
        },
        game_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'Games',
            referencesKey: 'id',
            onDelete: 'cascade'
        },
        cohort_id:{
            type: DataTypes.INTEGER,
            allowNull:true,
            references:'Cohorts',
            referencesKey:'id'
        },
        playdate:{
            type: DataTypes.DATE
        },
        score:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        total:{
            type: DataTypes.DECIMAL(10, 2)
        },
        program:{
            type: DataTypes.STRING(100)
        },
        playstartdate:{
            type: DataTypes.DATE
        },
        program_rank:{
            type: DataTypes.DECIMAL(10,0)
        },
        total_rank:{
            type: DataTypes.DECIMAL(10, 2)
        },
        difficulty_level:{
            type: DataTypes.INTEGER
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['player_id', 'game_id','cohort_id','score']
            }
        ],
        underscored: true
    });

    // Plays.associate = function(models) {
    //     Plays.belongsTo(models.Players, {foreignKey: 'player_id', as: 'player'})
    // };

    // Plays.associate = function(models) {
    //     Plays.belongsTo(models.Games, {foreignKey: 'game_id', as: 'game'})
    // };

    // Plays.associate = function(models) {
    //     Plays.belongsTo(models.Cohorts, {foreignKey: 'cohort_id', as: 'cohort'})
    // };

    return Plays;
}