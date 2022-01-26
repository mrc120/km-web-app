module.exports = (sequelize, DataTypes) => {
  const Filespol = sequelize.define("file_pol", {
    id: { type: DataTypes.INTEGER, primaryKey: true, notNull: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    data: { type: DataTypes.BLOB('long'), },
  });

  return Filespol;
};