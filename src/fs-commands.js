const fs = require("fs");
const pathLib = require("path");
const { withCwdLogging, withParamCheck } = require("./decorators");

const up = () => {
  try {
    process.chdir("../");
  } catch (err) {
    console.error(`Operation failed: ${err}`);
  }
};

const cd = (params) => {
  try {
    const [path] = params;
    process.chdir(path);
  } catch (err) {
    console.error(`Operation failed: ${err}`);
  }
};

const ls = () => {
  fs.readdir(process.cwd(), { withFileTypes: true }, (err, files) => {
    if (err) console.error("Operation failed");
    const filesMap = files
      .map((file) => ({
        name: file.name,
        type: file.isFile() ? "file" : "directory",
      }))
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "directory" ? -1 : 1;
        }

        return a.name.localeCompare(b.name);
      });
    console.log("\n");
    console.table(filesMap);
  });
};

const cat = (params) => {
  const [path] = params;

  const stream = fs.createReadStream(path, "utf8");
  stream.on("data", (chunk) => console.log(chunk));
  stream.on("error", () => console.log("Operation failed"));
};

const add = (params) => {
  const [newFileName] = params;

  fs.appendFile(newFileName, "", (err) => {
    if (err) {
      console.error("Operation failed");
    }
  });
};

const rn = (params) => {
  const [path, newName] = params;
  if (!path || !newName) {
    console.log("Invalid input: path or newName are not specified");
    return;
  }

  fs.rename(path, newName, (err) => {
    if (err) console.error("Operation failed");
  });
};

const cp = (params) => {
  const [path, newPath] = params;
  if (!path || !newPath) {
    console.log("Invalid input: path or newPath are not specified");
    return;
  }

  const fileName = pathLib.basename(path);

  const destinationPath = pathLib.join(newPath, fileName);

  const readable = fs.createReadStream(path);

  const writable = fs.createWriteStream(destinationPath);

  readable.pipe(writable);

  readable.on("error", () => console.error("Operation failed"));

  writable.on("error", () => console.error("Operation failed"));
};

const mv = (params) => {
  const [path, newPath] = params;
  if (!path || !newPath) {
    console.log("Invalid input: path or newPath are not specified");
    return;
  }

  const fileName = pathLib.basename(path);

  const destinationPath = pathLib.join(newPath, fileName);

  const readable = fs.createReadStream(path);

  const writable = fs.createWriteStream(destinationPath);

  readable.pipe(writable);

  readable.on("error", () => console.error("Operation failed"));

  writable.on("error", () => console.error("Operation failed"));

  writable.on("finish", () => {
    fs.unlink(path, (err) => {
      if (err) console.error("Operation failed");
    });
  });
};

const rm = (params) => {
  const [path] = params;
  fs.unlink(path, (err) => {
    if (err) console.error("Operation failed");
  });
};

module.exports = {
  up: withCwdLogging(up),
  cd: withParamCheck(withCwdLogging(cd)),
  ls: withCwdLogging(ls),
  cat: withParamCheck(withCwdLogging(cat)),
  add: withParamCheck(withCwdLogging(add)),
  rn: withParamCheck(withCwdLogging(rn)),
  cp: withParamCheck(withCwdLogging(cp)),
  mv: withParamCheck(withCwdLogging(mv)),
  rm: withParamCheck(withCwdLogging(rm)),
};
