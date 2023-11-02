const { errorHelper } = require("../helpers/errorHelp");
const { userRegistrationService } = require("../services/user.services");
exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    //check for correct payload
    if (
      !payload.email &&
      !payload.mobile &&
      !payload.password &&
      !payload.first_name &&
      !payload.last_name
    ) {
      // if paylaod is not valid
      res
        .status(400)
        .send(
          errorHelper(
            "invalid payload",
            400,
            "Bad request",
            "please check the payload and try again"
          )
        );
    }

    const response = await userRegistrationService(payload);
    console.log(response);
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
