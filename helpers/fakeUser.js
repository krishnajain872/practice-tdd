const { faker } = require("@faker-js/faker");
const User = (user = () => {
  return {
    first_name: faker.internet.userName(),
    last_name: faker.internet.userName(),
    email: faker.internet.email(),
    mobile: generateRandomMobileNumber(),
    password: faker.internet.password(),
  };
});

const USERS = faker.helpers.multiple(user, {
  count: 5,
});

module.exports = {
  User,
  USERS,
};
