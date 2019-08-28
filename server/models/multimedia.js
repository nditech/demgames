// Create Table Multimedia(
// id integer not null auto_increment,
// questionid integer,
// caption varchar(15),
// content BLOB,
// mediadescription text(2000),
// keywords varchar(100),
// primary key(id),
// constraint question_id_fk_questions foreign key (questionid)
// references Questions(id)
// );

module.exports = (sequelize, type) => {
    return sequelize.define('Multimedia', {
        id:{
          type: type.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        questionid:{
            type: type.INTEGER,
            allowNull: false,
            references: 'Questions', // <<< Note, its table's name, not object name
            referencesKey: 'id',
            onDelete: 'cascade'
        },
        caption:{
            type: type.STRING(15)
        },
        content:{
            type: type.BLOB
        },
        mediadescription:{
            type: type.TEXT(2000)
        },
        keywords:{
            type: type.STRING(100)
        }
    }, 
    {
        freezeTableName: true
    });
}