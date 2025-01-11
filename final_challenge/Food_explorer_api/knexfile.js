// Knex configuration
const path = require("node:path");

module.exports = {
  development: {
    client: 'sqlite3',
    
    // Path to the database file
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    // Path to the migrations directory
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    
    useNullAsDefault: true
  },
}
