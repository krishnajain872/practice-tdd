const bcrypt = require("bcrypt");
require("dotenv").config();
const { HASH_SALTS: salt } = process.env;
const passHashHelper = async (password) => {
  try {
    const hash = await bcrypt.hash(password, (saltRounds = Number(salt)));
    console.log("helper Hash =>  ", hash);
    return hash;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const passCompareHelper = async function comparePasswordToHash(password, hash) {
  try {
    // Use bcrypt's compare function to check if the password matches the hash
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  passCompareHelper,
  passHashHelper,
};
