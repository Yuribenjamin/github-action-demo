const axios = require("axios");
const core = require("@actions/core");

const DEFAULT_CHARACTER = "dr-zoidberg";

const availableCharacters = ["bender", "fry", "leela", "dr-zoidberg"];

async function run() {
  const character = core.getInput("character") || DEFAULT_CHARACTER;

  core.debug(`[futurama] input character: ${character}`);

  if (!availableCharacters.includes(character)) {
    core.setFailed(`Unkown character : ${character}`);
    return;
  }

  core.debug(`[futurama] Retrieving quote for: ${character}`);

  const response = await axios.get(
    `http://futuramaapi.herokuapp.com/api/characters/${character}/1`
  );

  core.debug(`[futurama] Successfully retrieved quote for: ${character}`);

  const { data } = response;

  core.debug(`[futurama] Data: ${JSON.stringify(data, null, 2)}`);

  const firstEntry = data[0];
  // console.log(`${firstEntry.character} ${firstEntry.quote}`);

  core.setOutput("quote", firstEntry);
}

run();
