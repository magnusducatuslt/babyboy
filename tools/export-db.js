const fs = require("fs").default;
const path = require("path").default;
const util = require("util").default;
const dbService = require("utils/database/databaseService").databaseService;
require("db/models");

function normalize(str) {
  return str[0].toLowerCase() + str.slice(1, str.length);
}

function format(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return [year, month, day, hours, minutes, seconds, milliseconds].reduce(
    (formatted, val) => {
      val = val < 10 ? `0${val}` : val;
      return `${formatted}${val}`;
    }
  );
}

format(new Date());

function queryAllModels(models) {
  return Object.keys(models).reduce(
    (chain, modelName) =>
      chain.then((results) =>
        dbService.models[modelName].findAll({ raw: true }).then((res) => {
          results[modelName] = res;
          return results;
        })
      ),
    Promise.resolve({})
  );
}

function createJsons(dirPath, data) {
  const writeFile = util.promisify(fs.writeFile);
  const mkdir = util.promisify(fs.mkdir);

  return mkdir(dirPath).then(() =>
    Promise.all(
      Object.keys(data).map((modelName) =>
        writeFile(
          path.join(dirPath, normalize(`${modelName}.json`)),
          JSON.stringify(data[modelName], null, 2)
        )
      )
    )
  );
}

function getModelNames() {
  return process.argv.slice(3).map((modelName) => modelName.toLowerCase());
}

function validateArgs(args, models) {
  if (args.length === 2) {
    return null;
  }

  if (args[2] && args[2] !== "-m") {
    return { errCode: "wrongArg" };
  }

  if (args.length === 3) {
    return { errCode: "noModels" };
  }

  const lowerCaseModels = Object.keys(models).map((modelName) =>
    modelName.toLowerCase()
  );
  const nonExistingModels = getModelNames().filter(
    (modelName) => !lowerCaseModels.includes(modelName)
  );

  if (nonExistingModels.length) {
    return { errCode: "nonExist", models: nonExistingModels };
  }
}

function printAndExit(success, data) {
  const red = "\x1b[31m";
  const green = "\x1b[32m";
  const reset = "\x1b[0m";

  if (success) {
    console.log(
      `${green}\n > Successfully exported in dir: ${data.dirPath}\n${reset}`
    );
    process.exit(0);
  }

  const syntaxMessage =
    "Please use this syntax: `yarn db:export [-m <model1>, <modelN>]`";
  const errors = {
    wrongArg: "Invalid arguments are provided.",
    noModels: "No models are specified",
    nonExist: "The following models are not exist in DB:",
  };

  if (data.errCode === "nonExist") {
    console.log(`${red}\n > ${errors[data.errCode]} ${data.models}${reset}`);
    console.log(`${red}\n > ${syntaxMessage}\n${reset}`);
    process.exit(1);
  }

  if (data.errCode === "general") {
    console.log(`${red}\n > An error occurred: ${data.err}\n${reset}`);
    process.exit(1);
  }

  console.log(`${red}\n > ${errors[data.errCode]}${reset}`);
  console.log(`${red}\n > ${syntaxMessage}\n${reset}`);

  process.exit(1);
}

function exportDb() {
  const dirPath = path.join(process.cwd(), `${format(new Date())}-export`);
  const error = validateArgs(process.argv, dbService.models);

  if (error) {
    printAndExit(false, error);
  }

  let models = {};
  const modelNames = getModelNames(process.argv);

  if (modelNames.length) {
    Object.keys(dbService.models).forEach((modelName) => {
      if (modelNames.includes(modelName.toLowerCase())) {
        models[modelName] = dbService.models[modelName];
      }
    });
  } else {
    models = dbService.models;
  }

  queryAllModels(models)
    .then(createJsons.bind(this, dirPath))
    .then(() => printAndExit(true, { dirPath }))
    .catch((err) => printAndExit(false, { err, errCode: "general" }));
}

exportDb();
