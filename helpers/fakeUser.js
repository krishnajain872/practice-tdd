const { faker } = require("@faker-js/faker");
module.exports.User = user =()=> {
  return {
    userId: faker.string.uuid(),
    first_name: faker.internet.userName(),
    last_name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

module.exports.USERS = faker.helpers.multiple(user, {
  count: 5,
});
