const payloadValidate = (payload) => {
  let isNotEmpty = Object.keys(payload).map((key) => payload[key].length != 0);
  return isNotEmpty;
};
module.exports = {
  payloadValidate,
};
