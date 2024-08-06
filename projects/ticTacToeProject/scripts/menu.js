import { loadPlayerNames, savePlayer1Name, savePlayer2Name } from "./storage.js";

const plr1Input = document.getElementById('plr1-input');
const plr2Input = document.getElementById('plr2-input');

plr1Input.value = loadPlayerNames().plr1;
plr2Input.value = loadPlayerNames().plr2;

plr1Input.addEventListener('input', (e) => {savePlayer1Name(e.target.value)});
plr2Input.addEventListener('input', (e) => {savePlayer2Name(e.target.value)});
