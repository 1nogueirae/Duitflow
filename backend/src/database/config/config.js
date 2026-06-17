require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "duitflow_db_dev",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./src/database/duitflow_db_dev.sqlite"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "duitflow_db_tests",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./src/database/duitflow_db_tests.sqlite"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "duitflow_db_prod",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./src/database/duitflow_db_prod.sqlite"
  }
}
