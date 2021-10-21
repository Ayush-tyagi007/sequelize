const express = require("express");
const sequelize = require("./configuration/config");
const { UserRouter, UserAddressRouter, imageRouter } = require("./routes");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;
app.use("/user", UserRouter, UserAddressRouter, imageRouter);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
