const User = require("../model");
const response = require("../utility");
const register = async (req, res) => {
  try {
    if (req.body.conf_password === req.body.password) {
      const userData = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      };
      const createdUser = await User.create(userData);
      res.send(response(0, "user registered successfully", createdUser));
    } else {
      res.send(response(1, "password not matched"));
    }
  } catch (er) {
    res.send(response(1, er.message || "error in try block"));
  }
};
module.exports = { register };
