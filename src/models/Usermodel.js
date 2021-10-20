// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");
// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   firstname: {
//     type: String,
//     required: true,
//   },
//   lastname: {
//     type: String,
//     required: true,
//   },
//   address: [{ type: mongoose.Schema.Types.ObjectId, ref: "address" }],
// });
// const User = mongoose.model("User", UserSchema);
// module.exports = User;
const sequelize = require("../configuration/config");
const { DataTypes } = require("sequelize");
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
