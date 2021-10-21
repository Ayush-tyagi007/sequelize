const sequelize = require("../configuration/config");
const { DataTypes } = require("sequelize");
const image = sequelize.define("image", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = image;
