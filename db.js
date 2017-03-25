// set up credentials
var secrets
try {
  secrets = require('./secrets.json')
} catch (err) {
  secrets = require('./secrets.example.json')
}

var Sequelize = require('sequelize')
var DATABASE_URL = process.env.DATABASE_URL || `postgres://${secrets.username}:${secrets.password}@localhost:5432/vaultdragon`
var sequelize = new Sequelize(DATABASE_URL)

var Store = sequelize.define('store', {
  key: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  value: {
    type: Sequelize.STRING
  },
  timestamp: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
})

Store.sync({force: true}) // Empty database

module.exports = {
  Store
}
