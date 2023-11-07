const errorHelper = (code, name, message, actual) => {
  return {
    code: code,
    success: false,
    name: name,
    message: message,
    actual: actual,
  };
};
module.exports = {
  errorHelper,
};
