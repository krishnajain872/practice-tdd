exports.errorHelper = (code, name, message, actual) => {
  let type;

  if (code == 409 || code == 422) {
    type = "service error";
  } else if (code == 400) {
    type = "client error";
  } else if (code == 500) {
    type = "Internal server error";
  }

  return {
    success: false,
    type: type,
    code: code,
    name: name,
    message: message,
    actual: actual,
  };
};
