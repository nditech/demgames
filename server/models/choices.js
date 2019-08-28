// Create Table Choices(
//     id integer not null auto_increment,
//     questionid integer,
//     choicestatement varchar(300),
//     choicedescription text(2000),
//     weight float(2),
//     answer TINYINT(2),
//     primary key(id),
//     constraint questions_id_fk_questions foreign key(questionid)
//     references Questions(id) on delete cascade
    
//     );

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Choices', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        questionid:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'Questions', // <<< Note, its table's name, not object name
            referencesKey: 'id',
            onDelete: 'cascade'
        },
        choicestatement:{
            type: DataTypes.STRING(300)
        },
        choicedescription:{
            type: DataTypes.TEXT(2000)
        },
        weight:{
            type: DataTypes.FLOAT(2)
        },
        answer:{
            type: DataTypes.INTEGER
        }
    }, 
    {
        freezeTableName: true
    });
}