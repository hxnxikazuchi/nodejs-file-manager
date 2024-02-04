const readline = require("readline");
const { up, cd, ls, cat, add, rn, cp, mv, rm } = require("./fs-commands");
const getOsInfo = require("./os-commands");

const argv = process.argv.slice(2);
const usernameArg = argv.find((arg) => arg.startsWith("--username="));
const username = usernameArg.split("=")[1];

console.log(`Welcome to the File Manager, ${username}!`);

console.log(`You are currently in ${process.cwd()}`);
// TODO: chanfe the starting directory
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.prompt();

const processCommands = (command) => {
  const [cmd, ...param] = command.split(" ");
  switch (cmd) {
    case "up":
      up();
      break;
    case "cd":
      cd(param);
      break;
    case "ls":
      ls();
      break;
    case "cat":
      cat(param);
      break;
    case "add":
      add(param);
      break;
    case "rn":
      rn(param);
      break;
    case "cp":
      cp(param);
      break;
    case "mv":
      mv(param);
      break;
    case "rm":
      rm(param);
      break;
    case "os":
      getOsInfo(param);
      break;
    case ".exit":
      console.log(
        `\n\nThank you for using File Manager, ${username}, goodbye!`
      );
      rl.close();
    default:
      console.log(`Invalid input: ${command}`);
  }

  rl.prompt();
};

rl.on("SIGINT", () => {
  console.log(`\n\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});

rl.on("line", (input) => {
  processCommands(input);
}).on("close", () => process.exit());
