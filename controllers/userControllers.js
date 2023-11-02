const { errorHelper } = require("../helpers/errorHelp");
const { userRegistrationService } = require("../services/user.services");
exports.registerUser = async (req, res) => {
  try {
    // payload
    const payload = req.body;
    console.log(payload);

    // validate payload
    let isNotEmpty = Object.keys(payload).map(
      (key) => payload[key].length != 0
    );
    if (!isNotEmpty) {
      return errorHelper(400, "Bad request", "validation error check payload");
    }
    // service call
    const response = await userRegistrationService(payload);
    console.log(response);
    console.log("responsev => API CONTROLLER RESPONSE", response);
    if (response.code === 201 && response.success === true) {
      res.status(201).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
