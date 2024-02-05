const os = require("os");
const { withCwdLogging, withParamCheck } = require("./decorators");

const getOsInfo = (params) => {
  const [param] = params;

  switch (param) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      cpuInfo();
      break;
    case "--homedir":
      console.log(`Home directory is: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`System user name is: ${os.hostname()}`);
      break;
    case "--architecture":
      console.log(`CPU architecture is: ${os.arch()}`);
      break;
    default:
      console.log(`Invalid input: ${param}`);
  }
};

const cpuInfo = () => {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`\tModel: ${cpu.model}`);
    console.log(`\tClock Rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
};

module.exports = withParamCheck(withCwdLogging(getOsInfo));
