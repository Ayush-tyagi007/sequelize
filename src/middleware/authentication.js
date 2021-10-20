const mongoose = require("mongoose");
const { Op } = require("sequelize");
const express = require("express");
const { User } = require("../models");
const { response } = require("../utilities");
async function auth(req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: { [Op.eq]: req.body.username } },
          { email: { [Op.eq]: req.body.email } },
        ],
      },
    });
    if (user) {
      if (user.username == req.body.username) {
        res.send(response("username exists", 1));
      } else if (user.email == req.body.email) {
        res.send(response("user with this email exist", 1));
      } 
    } else {
      next();
    }
  } catch (er) {
    console.log(er);
    res.send(response(er.message || "an error generated in try block", 1));
  }
}

module.exports = auth;
