const sequelize = require('../utils/connection');
const userCreate = require('./userCreate');
require('../models')

const testMigrate = async () => {

  try {
    await sequelize.sync({ force: true })
    console.log('DB reset ✅');
    await userCreate() //que nos agrega un usuario a la DB
    process.exit()
  } catch (error) {
    console.error(error);
  }
}

testMigrate()