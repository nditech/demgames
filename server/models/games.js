// Create Table Games(

//     id integer not null AUTO_INCREMENT,
//     caption varchar(200) not null,
//     gamedescription varchar(200) not null,
//     gametype varchar(200),
//     primary key(id)
//     );
'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('Games', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        caption:{
            type: type.STRING(200),
            allowNull: false
        },
        gamedescription:{
            type: type.STRING(200),
            allowNull: false
        },
        gametype:{
            type: type.STRING(200)
        }

    }, 
    {
        freezeTableName: true
    });
}