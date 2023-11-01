const db = require("../models");

const user = () => console.log(db.User);

module.exports = {
  user,
};
