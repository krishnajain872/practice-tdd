const errorHelper = (code, name, message, actual) => {
  if (code == 409 || 422) {
    type = "service error ";
  } else if (code == 400) {
    type = "client error";
  } else if (code == 500) {
    type = "Internal server error";
  }
  return {
    code: code,
    success: false,
    type: type,
    name: name,
    message: message,
    actual: actual,
  };
};
module.exports = {
  errorHelper,
};
