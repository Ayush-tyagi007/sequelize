const md5 = require("md5");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { access_token, address, User } = require("../models");
const { sendMail, response } = require("../utilities");
const Login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      const givenPassword = md5(req.body.password);
      if (user.password == givenPassword) {
        const data = {
          user_id: user.id,
          token: jwt.sign(
            {
              user_id: user.id,
            },
            "secret",
            { expiresIn: "1h" }
          ),
        };
        const accessToken = await access_token.create(data);
        res.send(response("user token", 0, accessToken.token));
      } else {
        res.send(response("password not matched", 1));
      }
    } else {
      res.send(response("user not exists", 1));
    }
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
const Register = async (req, res) => {
  try {
    if (req.body.password == req.body.conf_password) {
      const data = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: md5(req.body.password),
      };
      const user = await User.create(data);
      console.log("user created");
      const mailData = {
        email: user.email,
        about: "confirmation mail",
        msg: "user registered",
      };
      await sendMail(mailData);
      res.send(response("usercreated and mail sent", 0));
    } else {
      res.send(response("password and confirm password did not matched", 1));
    }
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
const UserDelete = async (req, res) => {
  try {
    const user_id = req.user_id;
    await User.destroy({ where: { id: user_id } });
    const AddressDeleted = await address.destroy({
      where: { UserId: user_id },
    });
    await access_token.destroy({ where: { user_id: user_id } });
    if (AddressDeleted != 0) {
      res.send(response("User deleted", 0));
    } else {
      res.send(
        response(
          "User deleted but this user has no addresss associated with it",
          1
        )
      );
    }
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
const UserGet = async (req, res) => {
  try {
    const user_id = req.user_id;
    const user = await User.findOne({
      where: { id: user_id },
      include: [{ model: address, as: "address" }],
    });
    if (user) {
      res.send(response("user ", 0, user));
    } else {
      res.send(response("user not found", 1));
    }
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
const UserGetId = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: address, as: "address" }],
    });
    if (user) {
      res.send(response("user", 0, user));
    } else {
      res.send(response("no user exists with this id", 1));
    }
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};

const UserList = async (req, res) => {
  try {
    const page = req.params.page - 1;
    const limitNumber = 10;
    const skipNumber = page * 10;
    const users = await User.findAll({
      offset: skipNumber,
      limit: limitNumber,
    });
    res.send(response("users", 0, users));
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      const tokenData = {
        user_id: user.id,
        token: jwt.sign(
          {
            user_id: user.id,
          },
          "secretkey",
          { expiresIn: "10m" }
        ),
      };
      const resettoken = await access_token.create(tokenData);
      console.log(resettoken.token);
      const mailData = {
        email: user.email,
        about: "reset token mail",
        msg: `http://localhost:3000/user/verify_reset_password/${resettoken.token}`,
      };
      await sendMail(mailData);
      res.send(response("token", 0, resettoken.token));
    } else {
      res.send(response("no user exists with this username", 1));
    }
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
const passwordReset = async (req, res) => {
  try {
    const user_id = req.user_id;
    const accessTokenId = req.accessTokenId;
    const newPassword = md5(req.body.password);
    await User.update(
      {
        password: newPassword,
      },
      {
        where: {
          id: user_id,
        },
      }
    )
      .then(console.log("Rows updated "))
      .catch((er) => {
        console.log(er);
      });
    await access_token.destroy({ where: { id: accessTokenId } });
    console.log("access token deleted");
    const updatedUser = await User.findOne({ where: { id: user_id } });
    const mailData = {
      email: updatedUser.email,
      about: "Confirmation Mail",
      msg: "password changed successfully",
    };
    res.send(updatedUser);
    await sendMail(mailData);
    res.send(response("password changed", 0));
  } catch (er) {
    res.send(response(er.message || "an error generated in try block", 1));
  }
};
module.exports = {
  Login,
  Register,
  UserDelete,
  UserGet,
  UserGetId,
  UserList,
  forgotPassword,
  passwordReset,
};
