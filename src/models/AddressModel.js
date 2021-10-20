// const mongoose = require("mongoose");
// const addressSchema = new mongoose.Schema({
//   user_id: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   pin_code: {
//     type: Number,
//     required: true,
//   },
//   phone_no: {
//     type: Number,
//     required: true,
//   },
// });
// const address = mongoose.model("address", addressSchema);
const sequelize = require("../configuration/config");
const { DataTypes } = require("sequelize");
const User = require("./Usermodel");
const address=sequelize.define("address",
{
  //   user_id: {
  //   type: DataTypes.STRING,
  //   allowNull:false,
  // },
  address: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  pin_code: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull:false,
  },
},
{
  timestamps: false,
}
);
User.hasMany(address,{foreginkey:"UserId",as:"address"})
module.exports = address;
