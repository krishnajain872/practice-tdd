const { faker } = require("@faker-js/faker");
const userFakeData = () => {
  return {
    first_name: faker.internet.userName(),
    last_name: faker.internet.userName(),
    email: faker.internet.email(),
    mobile: faker.number.int({ min: 1000000000, max: 9999999999 }),
    password: faker.internet.password(),
  };
};
const USERS = faker.helpers.multiple(userFakeData, {
  count: 5,
});

module.exports = {
  userFakeData,
  USERS,
};
