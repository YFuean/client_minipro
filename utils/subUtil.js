var subTime = function (val) {
  if (val.length == 0 || val == undefined) {
    return;
  } else {
    return val.substring(0, 9);
  }
};

module.exports.subTime = subTime;
