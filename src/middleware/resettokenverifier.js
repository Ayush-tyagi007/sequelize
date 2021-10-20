const { access_token } = require("../models");
const { response } = require("../utilities");
const jwt = require("jsonwebtoken");
async function resetTokenVerifier(req, res, next) {
    console.log(req.params.password_reset_token)
  try {
    jwt.verify(req.params.password_reset_token, "secretkey");
    const token = await access_token.findOne({ token: req.params.password_reset_token });
    if (token) {
      req.user_id = token.user_id;
      req.accessTokenId=token.id
      next();
    } else {
      res.send(response("token not exist", 1));
    }
  } catch (er) {
      console.log(er)
    res.send(response(er.message || "an error generated in try block", 1));
  }
}
module.exports=resetTokenVerifier