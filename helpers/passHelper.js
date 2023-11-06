const bcrypt  = require("bcrypt")
const passHashHelper = (hash = (password) => {
  bcrypt.hash(password, (saltRounds = 10), function (err, hash) {
    if (err) {
      console.log(err);
      return err;
    } else {
      return hash;
    }
  });
});

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
