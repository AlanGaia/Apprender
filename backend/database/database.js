const mongodb = require("mongodb");
const mongoURL = "mongodb+srv://databaseAdmin:cUOafmwbgh3eM1zN@apprender-ajmqn.mongodb.net/apprenderdb?retryWrites=true&w=majority";
const config = { useUnifiedTopology: true };

module.exports = {
  mongodb,
  mongoURL,
  config
}
