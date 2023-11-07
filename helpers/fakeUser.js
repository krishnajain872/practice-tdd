const { faker } = require("@faker-js/faker");
function generateRandomMobileNumber() {
  // Generate a random 10-digit number.
  const mobileNumber = Math.floor(Math.random() * 1000000000) + 1;
  return 
}

const User = () => {
  return {
    first_name: faker.internet.userName(),
    last_name: faker.internet.userName(),
    email: faker.internet.email(),
    mobile: generateRandomMobileNumber(),
    password: faker.internet.password(),
  };
};
const USERS = faker.helpers.multiple(User, {
  count: 5,
});

module.exports = {
  User,
  USERS,
};
