const axios = require("axios");
const core = require("@actions/core");

const DEFAULT_CHARACTER = "dr-zoidberg";

const availableCharacters = ["bender", "fry", "leela", "dr-zoidberg"];

async function run() {
  const character = core.getInput("character") || DEFAULT_CHARACTER;

  if (!availableCharacters.includes(character)) {
    core.setFailed(`Unkown character : ${character}`);
    return;
  }

  const response = await axios.get(
    `http://futuramaapi.herokuapp.com/api/characters/${character}/1`
  );
  const { data } = response;
  const firstEntry = data[0];
  console.log(`${firstEntry.character} ${firstEntry.quote}`);

  core.setOutput("quote", firstEntry);
}

run();
