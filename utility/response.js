function response(errorstatus, message, data) {
  const responseData = {
    status: errorstatus,
    msg: message,
    data: data,
  };
  return responseData;
}
module.exports = response;
