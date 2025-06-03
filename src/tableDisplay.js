const Table = require('cli-table3');
const { formatTimestamp, formatEventType } = require('./formatter');

let lastEventDataPerUser = {};
let userIdsListForTable = [];

function initTableDisplay(userIds) {
    userIdsListForTable = [...userIds];
    displayUserEventsTable();
}

function updateUserEvent(userId, eventDataRow) {
    lastEventDataPerUser[userId] = eventDataRow;
    displayUserEventsTable();
}

function displayUserEventsTable() {
    console.clear();

    console.log("Ping Network BOT     ");
    console.log("https://t.me/infomindao         ");
    console.log("-----------------------------------");

    const table = new Table({
        head: ['User ID', 'Timestamp', 'Event Type', 'Details', 'Info/Status'],
        colWidths: [15, 22, 25, 30, 30],
        wordWrap: true,
        style: { head: ['cyan'], border: ['grey'] }
    });

    userIdsListForTable.forEach(userId => {
        if (lastEventDataPerUser[userId]) {
            table.push(lastEventDataPerUser[userId]);
        } else {
            table.push([
                userId, 
                formatTimestamp(new Date()), 
                formatEventType('INITIALIZING'),
                'Waiting for data...', 
                ''
            ]);
        }
    });
    
    const totalActiveUsers = userIdsListForTable.length;
    console.log(`Current Status per Account (Total Active Accounts: ${totalActiveUsers}). (Press Ctrl+C to exit)`);
    console.log(table.toString());
}

module.exports = {
    initTableDisplay,
    updateUserEvent
};