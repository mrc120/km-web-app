module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define("file", {
    id_uchwaly:          { type: DataTypes.INTEGER, primaryKey: true, notNull: true, autoIncrement: true },
    title:       { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    name:        { type: DataTypes.STRING },
  });
  return Files;
};