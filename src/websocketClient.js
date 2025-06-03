const WebSocket = require('ws');
const config = require('./config');
const { formatTimestamp, formatEventType } = require('./formatter');
const { updateUserEvent } = require('./tableDisplay');

function connectWebSocket(userId) {
    const wsUrl = `${config.BASE_WS_URL}${userId}/events`;

    updateUserEvent(userId, [
        userId,
        formatTimestamp(new Date()),
        formatEventType('ATTEMPT_CONNECT'),
        wsUrl.substring(0, 45) + (wsUrl.length > 45 ? "..." : ""),
        ''
    ]);

    const ws = new WebSocket(wsUrl, {});

    ws.on('open', function open() {
        updateUserEvent(userId, [
            userId,
            formatTimestamp(new Date()),
            formatEventType('CONNECTION_OPEN'),
            'Successfully connected',
            ''
        ]);
    });

    ws.on('message', function incoming(message) {
        const messageString = message.toString();
        let rowData;
        try {
            const parsedMessage = JSON.parse(messageString);
            rowData = [
                userId,
                formatTimestamp(new Date()),
                formatEventType(parsedMessage.type || 'DATA_RECEIVED'),
                parsedMessage.data && parsedMessage.data.amount !== undefined ? String(parsedMessage.data.amount) : 'N/A',
                parsedMessage.data && parsedMessage.data.last_transaction_id !== undefined ? String(parsedMessage.data.last_transaction_id) : 'N/A'
            ];
        } catch (e) {
            rowData = [
                userId,
                formatTimestamp(new Date()),
                formatEventType('RAW_DATA_RECEIVED'),
                messageString.substring(0, 50) + (messageString.length > 50 ? "..." : ""),
                'JSON Parse Error'
            ];
        }
        updateUserEvent(userId, rowData);
    });

    ws.on('error', function error(err) {
        updateUserEvent(userId, [
            userId,
            formatTimestamp(new Date()),
            formatEventType('CONNECTION_ERROR'),
            err.message.substring(0, 50) + (err.message.length > 50 ? "..." : ""),
            ''
        ]);
    });

    ws.on('close', function close(code, reason) {
        const reasonString = reason ? reason.toString() : 'N/A';
        updateUserEvent(userId, [
            userId,
            formatTimestamp(new Date()),
            formatEventType('CONNECTION_CLOSED'),
            `Code: ${code}`,
            `Reconnect in ${config.RECONNECT_DELAY_MS / 1000}s. Reason: ${reasonString.substring(0,20)}...`
        ]);
        
        setTimeout(() => {
            connectWebSocket(userId);
        }, config.RECONNECT_DELAY_MS);
    });
}

module.exports = {
    connectWebSocket
};