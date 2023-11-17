require("dotenv").config();

const {
  DB_TEST: db_test,
  DB_DATABASE: db,
  USER_NAME: user,
  PASSWORD: password,
  DIALECT: db_dialect,
  HOST: host,
} = process.env;

module.exports = {
  development: {
    username: user,
    password: password,
    database: db,
    host: host,
    dialect: db_dialect,
  },
  test: {
    username: user,
    password: password,
    database: db_test,
    host: host,
    dialect: db_dialect,
  },
  production: {
    username: user,
    password: password,
    database: db,
    host: host,
    dialect: db_dialect,
  },
};
