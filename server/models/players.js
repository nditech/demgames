// Create Table Players(
//     id integer not null AUTO_INCREMENT,
//     firstname varchar(20),
//     middlename varchar(20),
//     lastname varchar(20),
//     username varchar(20) not null,
//     email varchar(101) not null,
//     dateofbirth Date,
//     gender varchar(6),
//     country varchar(35),
//     city varchar(35),
//     program varchar(100),
//     primary key(id)
//     );
'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Players', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        firstname:{
            type: DataTypes.STRING(20)
        },
        middlename:{
            type: DataTypes.STRING(20)
        },
        lastname:{
            type: DataTypes.STRING(20)
        },
        username:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(101),
            allowNull: false
        },
        dateofbirth:{
            type: DataTypes.DATE
        },
        gender:{
            type: DataTypes.STRING(6)
        },
        country:{
            type: DataTypes.STRING(35)
        },
        city:{
            type: DataTypes.STRING(35)
        },
        program:{
            type: DataTypes.STRING(100)
        }

    }, 
    {
        timestamps: false,
        freezeTableName: true,
        hooks: {
            afterValidate: (player, options) => {
                console.log('stored procedure working ....');
                console.log(player);
            }
          }
    });
}