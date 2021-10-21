const sequelize = require("../configuration/config");
const { DataTypes } = require("sequelize");
const access_token = sequelize.define("access_token", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
access_token.sync();
module.exports = access_token;
