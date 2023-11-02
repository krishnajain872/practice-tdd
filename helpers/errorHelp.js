module.exports.errorHelper = error = (error, code, name, message, actual) => {
  if (code == 409 || 422) {
    type = "service error ";
  } else if (code == 400) {
    type = "client error";
  } else if (code == 500) {
    type = "Internal server error";
  }
  return {
    error: error,
    type: type,
    code: code,
    name: name,
    message: message,
    actual: actual,
  };
};
