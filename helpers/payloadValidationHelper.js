module.exports.payloadValidate = (payload) => {
  console.log(payload)
  let isNotEmpty = Object.keys(payload).map((key) => payload[key].length != 0);
  return isNotEmpty;
};
