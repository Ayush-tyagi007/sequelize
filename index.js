const express = require("express");
const sequelize = require("./configuration/config");
const User = require("./model/user");
const user = require("./routes");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;
app.use("/user", user);
app.listen(port, () => {
  console.log("server listening at port ");
});
