const { createBrotliCompress, createBrotliDecompress } = require("zlib");
const { pipeline } = require("stream");
const { createReadStream, createWriteStream } = require("fs");
const { withCwdLogging, withParamCheck } = require("./decorators");

const compress = (params) => {
  const [path, newPath] = params;
  if (!path || !newPath) {
    console.log("Invalid input: path or newPath are not specified");
    return;
  }

  const brotliZip = createBrotliCompress();
  const file = createReadStream(path);
  const dest = createWriteStream(newPath);
  pipeline(file, brotliZip, dest, (err) => {
    if (err) console.error("Operation failed");
  });
};

const decompress = (params) => {
  const [path, newPath] = params;
  if (!path || !newPath) {
    console.log("Invalid input: path or newPath are not specified");
    return;
  }

  const unzip = createBrotliDecompress();
  const file = createReadStream(path);
  const dest = createWriteStream(newPath);

  pipeline(file, unzip, dest, (err) => {
    if (err) console.error("Operation failed");
  });
};

module.exports = {
  compress: withParamCheck(withCwdLogging(compress)),
  decompress: withParamCheck(withCwdLogging(decompress)),
};
