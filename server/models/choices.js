module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Choices",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      questionid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "Questions", // <<< Note, its table's name, not object name
        referencesKey: "id",
        onDelete: "cascade"
      },
      choicestatement: {
        type: DataTypes.STRING(300)
      },
      choicedescription: {
        type: DataTypes.TEXT(2000)
      },
      weight: {
        type: DataTypes.FLOAT(2)
      },
      answer: {
        type: DataTypes.INTEGER
      },
      linked_question: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
};
