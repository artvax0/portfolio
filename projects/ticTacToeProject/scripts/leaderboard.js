import { getWinnerLog } from "./storage.js";

let logs = getWinnerLog();

let dataForTable = '';
    logs.forEach((log, index) => {
    dataForTable += `
    <tr>
        <td>${index + 1}</td>
        <td>${new Date(log.timeOfWin)}</td>
        <td>${log.winner}</td>
    </tr>`
})

document.getElementById('table-data-body').innerHTML = dataForTable;
