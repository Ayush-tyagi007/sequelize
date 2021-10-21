const sequelize = require("../configuration/config");
const { DataTypes } = require("sequelize");
const User = require("./Usermodel");
const address = sequelize.define(
  "address",
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pin_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
User.hasMany(address, { foreginkey: "UserId", as: "address" });
module.exports = address;
