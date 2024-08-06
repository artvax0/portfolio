// load logs from localStorage
export function getWinnerLog() {
    const log = JSON.parse(localStorage.getItem('winner-log')) || [];
    return log;
}

// save winner in localStorage
export function winnerLog(data) {
    localStorage.setItem('winner-log', JSON.stringify(data));
}

export function savePlayer1Name(plrName) {
    let loadedNames = loadPlayerNames();
    localStorage.setItem('player-names', JSON.stringify({ ...loadedNames, plr1: plrName }));
}

export function savePlayer2Name(plrName) {
    let loadedNames = loadPlayerNames();
    localStorage.setItem('player-names', JSON.stringify({ ...loadedNames, plr2: plrName }));
}

export function loadPlayerNames() {
    const plrs = JSON.parse(localStorage.getItem('player-names')) || { plr1: 'Player 1', plr2: 'Player 2'};
    return plrs;
}