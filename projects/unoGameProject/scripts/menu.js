import { loadSettings, saveSettings } from "./storageHandler.js";

let playerSettings = loadSettings();
const settingsBtn = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('settings');
const playerName = document.getElementById('plr-name');
const closeBtn = document.getElementById('close-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');

playerName.value = playerSettings ?  JSON.parse(playerSettings).plrName : 'Player 1'

settingsBtn.addEventListener('click', () => {
    settingsMenu.style.display = 'flex';
});

saveSettingsBtn.addEventListener('click', () => {
    if (playerName.value.trim()) {
        const settings = { plrName: playerName.value };
        saveSettings(settings);
        settingsMenu.style.display = 'none';
    }
});

closeBtn.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
});