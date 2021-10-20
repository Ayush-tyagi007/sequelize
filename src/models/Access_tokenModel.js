// const mongoose = require("mongoose");
// const access_tokenSchema = new mongoose.Schema({
//   user_id: mongoose.Schema.Types.ObjectId,
//   token: String,
// });
// const access_token = mongoose.model("access_token", access_tokenSchema);
const sequelize = require("../configuration/config");
const { DataTypes } = require("sequelize");
const access_token=sequelize.define("access_token",
{
    user_id: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull:false,
  }
});
access_token.sync();
module.exports = access_token;
