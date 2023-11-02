const bcrypt = require("bcrypt");

module.exports.passHashHelper = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.log("pass hash error", err);
    throw err;
  }
};
