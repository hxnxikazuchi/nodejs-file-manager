const withCwdLogging = (fn) => {
  return (...args) => {
    fn(...args);
    console.log(`You are currently in ${process.cwd()}`);
  };
};

function withParamCheck(fn) {
  return function (param) {
    if (!param.length) {
      console.log("Invalid input: parameters is not specified");
      return;
    }
    return fn(param);
  };
}

module.exports = {
  withCwdLogging,
  withParamCheck,
};
