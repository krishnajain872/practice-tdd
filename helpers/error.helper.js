const errorHelper = (code, name, message, actual) => {
 
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
