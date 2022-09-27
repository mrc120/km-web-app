module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define("file", {
    id:          { type: DataTypes.INTEGER,
                   primaryKey: true, notNull: true,
                   autoIncrement: true },
    title:       { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    name:        { type: DataTypes.STRING },
    data:        { type: DataTypes.BLOB('long')},
    nameAtt:     { type: DataTypes.STRING },
    attachment:  { type: DataTypes.BLOB('long')}
  });
  return Files;
};