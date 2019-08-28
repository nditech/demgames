// create table Questions(

//     id integer not null AUTO_INCREMENT,
//     gameid integer,
//     difficulty_level tinyint(2),
//     question_statement varchar(300),
//     weight FLOAT(2),
//     explanation text (2000),
//     isitmedia TINYINT(2),
//     primary key(id),
//     constraint game_id_fk_questions foreign key(gameid) references
    
//     Games(id) on delete cascade
//     );
'use strict';
 
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Questions', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        game_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'Games', // <<< Note, its table's name, not object name
            referencesKey: 'id',
            onDelete: 'cascade'
        },
        difficulty_level:{
            type: DataTypes.INTEGER
        },
        question_statement:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        weight:{
            type: DataTypes.FLOAT(2)
        },
        explanation:{
            type: DataTypes.TEXT(3000)
        },
        isitmedia:{
            type: DataTypes.INTEGER
        }
    }, 
    {
        freezeTableName: true
    });
}