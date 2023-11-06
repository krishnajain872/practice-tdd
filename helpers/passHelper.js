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

module.exports.passCompareHelper = async function comparePasswordToHash(password, hash) {
  try {
    // Use bcrypt's compare function to check if the password matches the hash
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  } catch (error) {
   console.log(error)
  }
}