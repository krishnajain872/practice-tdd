const { errorHelper } = require("./errorHelp");

module.exports.passHashHelper = hash = (password) => {
  bcrypt.hash(password, (saltRounds = 10), function (err, hash) {
    if (err) {
      console.log(err);
      return err;
    } else {
      return hash;
    }
  });
};
