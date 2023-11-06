const error = (req, res, error, code, name, message, actual) => {
  if (code == 409 || 422) {
    type = "service error ";
  } else if (code == 400) {
    type = "client error";
  } else if (code == 500) {
    type = "Internal server error";
  }

  res.status(code).send({
    error: error,
    type: type,
    code: code,
    name: name,
    message: message,
    actual: actual,
  });

  return {
    error: error,
    type: type,
    code: code,
    name: name,
    message: message,
    actual: actual,
  };
};
module.exports = {
  error,
};
