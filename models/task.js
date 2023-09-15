module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending", // Completed + Cancelled others?
    },
    date_time: DataTypes.DATE,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Task;
};
