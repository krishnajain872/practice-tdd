const { faker } = require("@faker-js/faker");
const User = () => {
  return {
    first_name: faker.internet.userName(),
    last_name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    mobile: faker.number.int({ min: 1000000000, max: 9999999999 }),
  };
};
const USERS = faker.helpers.multiple(User, {
  count: 5,
});

module.exports = {
  User,
  USERS,
};
