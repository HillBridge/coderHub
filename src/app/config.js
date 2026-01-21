require("dotenv").config();
const path = require("path");
const fs = require("fs");

const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key"),
  "utf-8"
);
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key"),
  "utf-8"
);

const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PUBLIC_KEY,
  PRIVATE_KEY,
};
