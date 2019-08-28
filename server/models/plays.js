
// create table Plays(

//     id varchar(30) not null,
//     player_id integer not null,
//     game_id integer not null,
//     playdate Date,
//     score numeric not null,
//     total numeric,
//     program varchar(100),
//     playstartdate Date,
//     program_rank numeric,
//     total_rank numeric,
//     index (player_id),
//     index (game_id),
//     primary key(id),
    

//     CONSTRAINT player_id_fk foreign key(player_id) references
    
//     Players(id) on delete cascade,
    
//     CONSTRAINT game_id_fk foreign key(game_id) references
    
//     Games(id) on delete cascade,
    
//     UNIQUE KEY uniqueGamesPerPlayer (player_id, game_id,
    
//     score)
//     );
'use strict';
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
        playdate:{
            type: DataTypes.DATE
        },
        score:{
            type: DataTypes.DECIMAL(10,0),
            allowNull: false
        },
        total:{
            type: DataTypes.DECIMAL(10,0)
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
            type: DataTypes.DECIMAL(10.0)
        }

    }, 
    {
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['player_id', 'game_id','score']
            }
        ]
    });

    Plays.associate = function(models) {
        Plays.belongsTo(models.Players, {foreignKey: 'player_id', as: 'player'})
    };

    Plays.associate = function(models) {
        Plays.belongsTo(models.Games, {foreignKey: 'game_id', as: 'game'})
    };

    return Plays;
}