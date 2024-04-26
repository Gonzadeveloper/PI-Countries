const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Activity', {
      id:{
          type:DataTypes.INTEGER,
          allowNull:false,
          primaryKey:true,
          autoIncrement: true,
      },
      name:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      dificultad:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      duración:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      temporada:{
        type: DataTypes.STRING,
        allowNull:false,
      }
  }, {timestamps:false});
};
