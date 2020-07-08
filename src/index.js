const axios = require("axios");
const core = require("@actions/core");

const DEFAULT_CHARACTER = "dr-zoidberg";

async function run() {
  const character = core.getInput("character") || DEFAULT_CHARACTER;
  console.log(character);

  const response = await axios.get(
    `http://futuramaapi.herokuapp.com/api/characters/${character}/1`
  );
  const { data } = response;
  const firstEntry = data[0];
  console.log(`${firstEntry.character} ${firstEntry.quote}`);

  core.setOutput("quote", firstEntry);
}

run();
