const fs = require('fs');
const path = require('path');
const config = require('./config');
const { connectWebSocket } = require('./websocketClient');
const { initTableDisplay } = require('./tableDisplay');

async function main() {

    console.log("Reading account configuration from data.txt...");

    try {
        const absoluteDataFilePath = path.resolve(__dirname, '..', config.DATA_FILE_PATH);
        const fileContent = fs.readFileSync(absoluteDataFilePath, 'utf8');
        
        const userIds = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line); 

        if (userIds.length === 0) {
            console.error("No valid User IDs found in data.txt.");
            console.error("Please ensure data.txt contains User IDs, one ID per line.");
            process.exit(1);
        }

        console.log(`Successfully read ${userIds.length} User ID(s). Initializing connections...\n`);

        initTableDisplay(userIds); 

        userIds.forEach(id => {
            connectWebSocket(id);
        });

    } catch (err) {
        console.error(`Failed to process file ${config.DATA_FILE_PATH}: ${err.message}`);
        console.error(`Full path attempted: ${path.resolve(__dirname, '..', config.DATA_FILE_PATH)}`);
        console.error("Please ensure data.txt exists in the project root directory and is accessible.");
        process.exit(1);
    }
}

process.on('SIGINT', function() {
    console.clear();
    console.log("\nScript interrupted by user. Goodbye!");
    process.exit(0);
});

main();