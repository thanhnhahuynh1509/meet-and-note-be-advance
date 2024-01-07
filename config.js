const dotenv = require("dotenv");

function setup() {
  dotenv.config({ path: "./.env" });
}

setup();
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "meet_and_note";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "my-secret-key";

module.exports = {
  PORT,
  DB_HOST,
  DB_NAME,
  JWT_SECRET_KEY,
};
