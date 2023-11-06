const { faker } = require("@faker-js/faker");

function generateRandomMobileNumber() {
  // Generate a random 10-digit number.
  const mobileNumber = Math.floor(Math.random() * 1000000000) + 1;

  // Return the mobile number as a string.
  return mobileNumber.toString();
}

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
