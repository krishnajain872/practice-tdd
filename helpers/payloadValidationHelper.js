<<<<<<< HEAD
module.exports.payloadValidate = (payload) => {
  console.log(payload)
=======
const payloadValidate = (payload) => {
>>>>>>> feature-update-balance-service
  let isNotEmpty = Object.keys(payload).map((key) => payload[key].length != 0);
  return isNotEmpty;
};
module.exports = {
  payloadValidate,
};
