const { createHash } = require("crypto");
const { createReadStream } = require("fs");
const { withCwdLogging, withParamCheck } = require("./decorators");

const calculateHash = (params) => {
  const [path] = params;
  const hash = createHash("sha256");
  const stream = createReadStream(path);

  stream.on("data", (chunk) => {
    hash.update(chunk, "utf8");
  });

  stream.on("end", () => {
    console.log(`Calculated hash is: ${hash.digest("hex")}`);
  });

  stream.on("error", (err) => {
    console.error("Error reading the file:", err);
  });
};

module.exports = withParamCheck(withCwdLogging(calculateHash));
