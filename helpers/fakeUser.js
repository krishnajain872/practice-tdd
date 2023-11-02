const { faker } = require("@faker-js/faker");
module.exports.userFakeData = user = () => {
  function generateRandomMobileNumber() {
    // Generate a random number between 1000000000 and 999.999.9999
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    // Convert the number to a string
    const mobileNumber = randomNumber.toString();

    // Return the mobile number
    return mobileNumber;
  }

  return {
    first_name: faker.internet.userName(),
    last_name: faker.internet.userName(),
    email: faker.internet.email(),
    mobile: generateRandomMobileNumber(),
    password: faker.internet.password(),
  };
};

module.exports.USERS = faker.helpers.multiple(user, {
  count: 5,
});
