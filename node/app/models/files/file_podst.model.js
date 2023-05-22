module.exports = (sequelize, DataTypes) => {
  const Files_podst = sequelize.define("file_podst", {
    id:            { type: DataTypes.INTEGER,
                     primaryKey: true, notNull: true,
                     autoIncrement: true    },
    title:         { type: DataTypes.STRING },
    description:   { type: DataTypes.STRING },
    name:          { type: DataTypes.STRING },
    data:          { type: DataTypes.BLOB('long'), },
  });

  return Files_podst;
};