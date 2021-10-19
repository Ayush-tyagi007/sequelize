const Sequelize=require("sequelize")
const sequelize = new Sequelize('postgres', 'ayush2', '123', {
    host: 'localhost',
    dialect: 'postgres' 
  });
  (async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }})();
  module.exports=sequelize