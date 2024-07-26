// load logs from localStorage
export function getWinnerLog() {
    const log = JSON.parse(localStorage.getItem('winner-log')) || [];
    return log;
}

// save winner in localStorage
export function winnerLog(data) {
    localStorage.setItem('winner-log', JSON.stringify(data))
}