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
            type: type.STRING(200),
        },
        style:{
            type: type.STRING(200)
        },
        par_score:{
            type: type.INTEGER
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true
    });
}