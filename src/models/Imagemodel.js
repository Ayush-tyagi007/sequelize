// const mongoose = require("mongoose");
// const ImageSchema = new mongoose.Schema({
//   image: { type: String, required: true },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
// });
// const image = mongoose.model("image", ImageSchema);
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
